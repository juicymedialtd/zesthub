const { prisma } = require("../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function createRequest(req, res) {
  const session = await getSession({ req });

  try {
    if (session) {

      const holidayCount = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
        select: {
         holidaysLeft: true
        },
      });

      const totalMilage = 0

      const totalExpenses = 0

      res.status(200).json({ holidayCount, totalMilage, totalExpenses });
    } else {
      res.status(404).json({ error: "You must be logged in" });
    }
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
