import prisma from"../../../../prisma/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  try {
    if (session && session.user.role === "ADMIN") {
      // When everything is green code is executed below :)

      const pending = await prisma.mileage.findMany({
        where: {
          status: "pending",
        },
        include: {
          User: {
            select: {
              name: true,
            },
          },
        },
      });

      res.status(200).json({ pending });
    } else {
      res.status(404).json({ error: "You must be logged in" });
    }
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
