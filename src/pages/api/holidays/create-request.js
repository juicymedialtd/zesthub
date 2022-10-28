const { prisma } = require("../../../prisma/prisma");
import { getSession } from "next-auth/react";
import {parseISO, differenceInBusinessDays, format, addHours} from "date-fns";

export default async function createRequest(req, res) {
  const session = await getSession({ req });

  const { start, end, type, half } = req.body;

  function formatDate(date, utcOffsetHrs) {
    const baseTzOffset = utcOffsetHrs * 60;
    const tzOffset = date.getTimezoneOffset();
    const d = new Date(date.valueOf() + (baseTzOffset + tzOffset) * 60 * 1000);
    console.log(d)
    return addHours(d, 2)
  }

  const s = new Date(start)
  const sTZ = formatDate(s, 0);
  var startDate = sTZ

  const e = new Date(end)
  const eTZ = formatDate(e, 0)
  var endDate = eTZ
  var numOfDates = getBusinessDatesCount(startDate, endDate);

  function getBusinessDatesCount(startDate, endDate) {
    let count = 0;
    const curDate = new Date(startDate.getTime());
    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      if(dayOfWeek !== 0 && dayOfWeek !== 6) count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  }

  function holidayType() {
    const { type } = req.body
    let count
    const t = type.type
    switch (t) {
      case 'birthday':
        count = false
        break
      case 'annual':
        count = true
        break
      default:
        count = true
        break
    }
    return count
  }

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
            daysUsed: holidayType() ? half ? "0.5" : String(numOfDates) : "0",
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
