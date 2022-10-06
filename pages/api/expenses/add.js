const { prisma } = require("../../../prisma/prisma");
import { getSession } from "next-auth/react";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function createRequest(req, res) {
  const session = await getSession({ req });

  const form = new formidable.IncomingForm();

  // const s3Client = new S3Client({
  //   endpoint: "https://ams3.digitaloceanspaces.com/", // Find your endpoint in the control panel, under Settings. Prepend "https://".
  //   region: "ams3", // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
  //   credentials: {
  //     accessKeyId: "Y5ULDOO4C4LN4ZGBMPDE", // Access key pair. You can create access key pairs using the control panel or API.
  //     secretAccessKey: process.env.S3_KEY, // Secret access key defined through an environment variable.
  //   },
  // });

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

        // const file = files.File;
        // const filename = file.originalFilename;

        // const f = fs.readFileSync(file.filepath);

        // const params = {
        //   Bucket: `juicyportal`, // The path to the directory you want to upload the object to, starting with your Space name.
        //   Key: `reciepts/${session.user.id}/${filename}`, // Object key, referenced whenever you want to access this file later.
        //   Body: f, // The object's contents. This variable is an object, not a string.
        //   ACL: "public-read",
        //   ContentType: file.mimetype

        // };

        // await s3Client.send(new PutObjectCommand(params));

        // console.log(
        //   "Successfully uploaded object: " + params.Bucket + "/" + params.Key
        // );

        // const url =
        //   process.env.BUCKET_ENDPOINT +
        //   `reciepts/${session.user.id}/${filename}`;

        await prisma.expense.create({
          data: {
            title: fields.reason,
            total: Number(fields.total),
            receipt: 'url',
            userId: session.user.id,
            status: "PENDING",
          },
        });
      });

      res.status(200).json({ message: "New request created & saved :)" });
    } else {
      res.status(404).json({ error: "You must be logged in" });
    }
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
