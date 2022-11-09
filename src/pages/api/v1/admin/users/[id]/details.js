import prisma from"../../../../../../prisma/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  const { id } = req.query;

  try {
    if (session.user.id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          holidays: true,
        },
      });

      res.status(200).json({ success: true, user });
    } else {
      res
        .status(403)
        .json({ message: "You must be logged in", success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error });
    console.log(error);
  }
}
