import { getSession } from "next-auth/react";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import formidable from "formidable";
import fs from "fs";

const { prisma } = require("../../../../prisma/prisma");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const session = await getSession({ req });

  const form = new formidable.IncomingForm();

  const s3Client = new S3Client({
    region: "eu-west-2",
    credentials: {
      accessKeyId: " AKIA5ZU55NWDBO6TLOU2", // Access key pair. You can create access key pairs using the control panel or API.
      secretAccessKey: process.env.S3_KEY, // Secret access key defined through an environment variable.
    },
  });

  try {
    if (session) {
      // When everything is green code is executed below :)

      form.parse(req, async function (err, fields, files) {
        if (err) {
          console.log("Error parsing incoming file");
          return res.json({
            ok: false,
            msg: "Error passing the incoming form",
          });
        }

        const file = files.photo;
        const filename = file.originalFilename;
        const k = `uploads/profile/${session.user.id}/${filename}`;

        const f = fs.readFileSync(file.filepath);

        const params = {
          Bucket: `zesthub`, // The path to the directory you want to upload the object to, starting with your Space name.
          Key: k, // Object key, referenced whenever you want to access this file later.
          Body: f, // The object's contents. This variable is an object, not a string.
          ContentType: file.mimetype,
        };

        await s3Client.send(new PutObjectCommand(params));

        console.log(
          "Successfully uploaded object: " + params.Bucket + "/" + params.Key
        );

        await prisma.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            profileUrl: k,
          },
        });
      });

      res.status(200).json({ message: "New request created & saved :)" });
    } else {
      res.status(404).json({ error: "You must be logged in" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
