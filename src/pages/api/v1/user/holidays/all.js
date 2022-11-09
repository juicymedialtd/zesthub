import prisma from"../../../../../prisma/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  try {
    if (session) {
      // When everything is green code is executed below :)
      const holidays = await prisma.holiday.findMany({
        where: {
          userId: session.user.id,
        },
      });

      const stats = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
        select: {
          holidaysLeft: true,
          HolidayAllowance: true,
        },
      });

      res.status(200).json({ holidays, stats });
    } else {
      res.status(401).json({ error: "You must be logged in" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
