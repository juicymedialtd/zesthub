import prisma from "../../../prisma/prisma";
import { getSession } from "next-auth/react";
import { parseISO, addHours, isSameDay } from "date-fns";
import HolidayCreationEmail from "../../../libs/nodemailer/holidays/creation";

import bankHols from "../../../libs/holidays/2022/uk.json";

export default async function createRequest(req, res) {
  const session = await getSession({ req });

  const { start, end, type, half } = req.body;

  function formatDate(date, utcOffsetHrs) {
    const baseTzOffset = utcOffsetHrs * 60;
    const tzOffset = date.getTimezoneOffset();
    const d = new Date(date.valueOf() + (baseTzOffset + tzOffset) * 60 * 1000);
    return addHours(d, 2);
  }

  const s = new Date(start);
  const sTZ = formatDate(s, 0);
  var startDate = sTZ;

  const e = new Date(end);
  const eTZ = formatDate(e, 0);
  var endDate = eTZ;
  var numOfDates = getBusinessDatesCount(startDate, endDate);

  // Loop over bankHolidayArray and return true or false
  function checkBankHoliday(date) {
    const d = new Date(date);
    const dTZ = formatDate(d, 0);
    let t;
    for (let k = 0; k < bankHols.length; k++) {
      const bank = new Date(bankHols[k].date);
      t = isSameDay(d, bank)
        ? true
        : false;
      if (t) break;
    }

    console.log(t);

    return t;
  }

  function getBusinessDatesCount(startDate, endDate) {
    let count = 0;
    const curDate = new Date(startDate.getTime());
    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      const bankholiday = checkBankHoliday(curDate);
      if (dayOfWeek !== 0 && dayOfWeek !== 6 && !bankholiday) count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  }

  function holidayType() {
    const { type } = req.body;
    let count;
    const t = type.type;
    switch (t) {
      case "birthday":
        count = false;
        break;
      case "annual":
        count = true;
        break;
      default:
        count = true;
        break;
    }
    return count;
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
            daysUsed: holidayType() ? (half ? "0.5" : String(numOfDates)) : "0",
          },
        });

        const user = session.user.email;
        const name = session.user.name;

        const admins = await prisma.user.findMany({
          where: {
            teamId: session.user.teamId,
            role: "ADMIN",
          },
        });

        await HolidayCreationEmail(user, name, admins);

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
