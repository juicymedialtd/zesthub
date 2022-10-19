const { prisma } = require("../../../prisma/prisma");
import { getSession } from "next-auth/react";
import { differenceInBusinessDays, parseISO } from "date-fns";

export default async function createRequest(req, res) {
  const session = await getSession({ req });

  const { start, end, type, half } = req.body;

  const daysUsed = differenceInBusinessDays(parseISO(end), parseISO(start));

  try {
    if (session) {
      if (!start || !end) {
        res.status(500).json({ error: "Both dates are needed" });
      } else {
        await prisma.holiday.create({
          data: {
            userId: session.user.id,
            type: type.type,
            startDate: parseISO(start),
            endDate: parseISO(end),
            status: "pending",
            daysUsed: half ? "0.5" : String(daysUsed + 1),
          },
        });

        res.status(200).json({ message: "Request created :)" });
      }
    } else {
      res.status(404).json({ error: "You must be logged in" });
    }
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}