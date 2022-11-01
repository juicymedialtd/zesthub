const { prisma } = require("../../../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  try {
    if (session.user.id) {
      const users = await prisma.user.findMany({
        where: {
          teamId: session.user.teamId,
        },
      });

      res.status(200).json({ success: true, users });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, err });
  }
}
