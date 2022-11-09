import prisma from"../../../../../prisma/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  try {
    const team = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    const users = await prisma.user.findMany({
      where: {
        teamId: team.teamId,
      },
      select: {
        name: true,
        email: true,
        id: true,
        role: true,
        teamId: true,
        
      }
    });

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
}
