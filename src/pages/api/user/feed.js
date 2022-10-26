const { prisma } = require("../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  try {
    if (session) {
      const feed = await prisma.holiday.findMany({
        where: {
          status: "approved",
          startDate: {
            gte: new Date("2020-10-01T14:21:00+0200"),
          },
        },
        include: {
          User: {
            select: {
              name: true,
              profileUrl: true,
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
