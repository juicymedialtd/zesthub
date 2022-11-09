import prisma from"../../../../../prisma/prisma";
import bcrypt from "bcrypt";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  const { confirm } = req.body;

  const hash = await bcrypt.hash(confirm, 10);

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        password: hash,
      },
    });

    res.status(200).json({ success: true, message: "Password updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
