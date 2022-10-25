const { prisma } = require("../../../../prisma/prisma");
import { getSession } from "next-auth/react";
import { sendUserInvite } from "../../../../libs/nodemailer/auth/invite";

export default async function handler(req, res) {
  const session = await getSession({ req });

  const { email } = req.body;

  try {
    if (session && session.user.role === "ADMIN") {
      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
        include: {
          team: true,
        },
      });

      const invite = await prisma.invites.create({
        data: {
          email: email,
          teamID: user.teamId,
        },
      });

      await sendUserInvite(invite.code, email, user.team.name);

      res.status(200).json({ sucess: true, message: "Invite sent correctly" });
    } else {
      res.status(403).json({ sucess: false, message: "You are not logged in" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, error });
  }
}
