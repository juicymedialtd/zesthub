const { prisma } = require("../../../../prisma/prisma");
import { getSession } from "next-auth/react";
import { sendUserInvite } from "../../../../libs/nodemailer/auth/invite";

// TODO save invited email & teamId to db -> send email

export default async function handler(req, res) {
  const session = await getSession({ req });

  const { email } = req.body;

  try {
    if (session && session.user.role === "ADMIN") {
      const user = await prisma.user.findUnique({
       where: {
        id: session.user.id,
       }
      });

      const code = 1234;

      const invite = await prisma.invites.create({
        data: {
          email: email,
          teamID: user.teamId,
        },
      });

      await sendUserInvite(code, email, user.teamId);

      res.status(200).json({ sucess: true, message: "Invite sent correctly" });
    } else {
      res.status(403).json({ sucess: false, message: "You are not logged in" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, error });
  }
}
