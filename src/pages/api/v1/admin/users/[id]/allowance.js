import prisma from"../../../../../../prisma/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  const { id } = req.query;
  const { allowance } = req.body

  try {
    if (session.user.id) {
      
    await prisma.user.update({
        where: {
            id
        },
        data: {
            HolidayAllowance: Number(allowance)
        }
    })

      res.status(200).json({ success: true,  });
    } else {
      res
        .status(403)
        .json({ message: "You must be logged in", success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error });
    console.log(error);
  }
}
