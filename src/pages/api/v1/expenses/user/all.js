import prisma from"../../../../../prisma/prisma";
import { getSession } from "next-auth/react";

export default async function createRequest(req, res) {
  const session = await getSession({ req });

  try {
    if (session) {

      const expenses = await prisma.expense.findMany({
        where: {
          userId: session.user.id,
        },
      });

      res.status(200).json({ expenses });
    } else {
      res.status(404).json({ error: "You must be logged in" });
    }
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
