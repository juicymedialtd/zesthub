const { prisma } = require("../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  const miles = req.body.miles.toFixed(2)

  try {
    if (session) {
      // save incoming data

      const submission = await prisma.mileage.create({
        data: {
          miles: Number(miles),
          Reason: req.body.reason,
          userId: session.user.id,
          status: "pending",
          stops: req.body.stops,
          startPostcode: req.body.start
        },
      });

      res.status(200).json({ submission });
    } else {
      res.status(404).json({ error: "You must be logged in" });
    }
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
