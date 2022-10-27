const { prisma } = require("../../../prisma/prisma");
import { getSession } from "next-auth/react";
import {endOfDay, addWeeks} from 'date-fns'

export default async function handler(req, res) {
  const session = await getSession({ req });

  const d = new Date()
  const weeks = addWeeks(d, 2)

  console.log(d, "2022-10-25T14:21:00+0200")

  try {
    if (session) {
      const feed = await prisma.holiday.findMany({
        where: {
          status: "approved",
          startDate: {
            gte: d,
          },
          endDate: {
            lte: weeks
          }
        },
        include: {
          User: {
            select: {
              name: true,
              profileUrl: true
            },
          },
        },
      });

      res.status(200).json({ feed });
    } else {
      res.status(404).json({ error: "You must be logged in" });
    }
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
