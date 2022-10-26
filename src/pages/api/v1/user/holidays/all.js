const { prisma } = require("../../../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function createRequest(req, res) {
  const session = await getSession({ req });

  console.log(session);

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
      res.status(404).json({ error: "You must be logged in" });
    }
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
