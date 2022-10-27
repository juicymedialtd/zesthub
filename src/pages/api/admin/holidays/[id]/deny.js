import {deniedHoliday} from "../../../../../libs/nodemailer/holidays/denied";

const { prisma } = require("../../../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function createRequest(req, res) {
  const session = await getSession({ req });

  const { id } = req.query;

  try {
    if (session && session.user.role === "ADMIN") {
      // When everything is green code is executed below :)

     const hol = await prisma.holiday.update({
        where: {
          id,
        },
        data: {
          status: "denied",
        },
      });

     const u = prisma.user.findUnique({
         where: {
             id: hol.userId
         }
     })
        await deniedHoliday(u.email)

      res.status(200).json({ message: "Record updated" });
    } else {
      res.status(404).json({ error: "You must be an admin" });
    }
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
