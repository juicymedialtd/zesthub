const { prisma } = require("../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  try {
    if (session) {

      const miles = await prisma.mileage.findMany({
        where: {
          userId: session.user.id,
        },
      });

      res.status(200).json({ success: true, miles });
    } else {
      res.status(404).json({ error: "You must be logged in" });
    }
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
