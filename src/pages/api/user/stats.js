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
          holidaysLeft: true,
        },
      });

      const expenses = await prisma.expense.findMany({
        where: {
          userId: session.user.id,
        },
      });

      const miles = await prisma.mileage.findMany({
        where: {
          userId: session.user.id,
        },
      });

      let totalExpenses = 0;
      let totalMilage = 0;

      if (expenses.length !== 0) {
        let t = 0;

        for (let i = 0; i < expenses.length; i++) {
          const total = t + expenses[i].total;
          t = total;
        }

        totalExpenses = t;
      }

      if (miles.length !== 0) {
        let t = 0;

        for (let i = 0; i < miles.length; i++) {
          const total = t + miles[i].miles;
          t = total;
        }

        totalMilage = t;
      }

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
