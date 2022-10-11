const { prisma } = require("../../../../../prisma/prisma");
import { getSession } from "next-auth/react";

export default async function createRequest(req, res) {
  const session = await getSession({ req });

  const { id } = req.query;

  try {
    if (session && session.user.role === "ADMIN") {
      // When everything is green code is executed below :)

      await prisma.mileage.update({
        where: {
          id: Number(id),
        },
        data: {
          status: "denied",
        },
      });

      res.status(200).json({ message: "Record updated :)" });
    } else {
      res.status(404).json({ error: "You must be an admin" });
    }
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
