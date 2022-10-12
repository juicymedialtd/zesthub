const { prisma } = require("../../../../prisma/prisma");
import { getSession } from "next-auth/react";


export default async function createRequest(req, res) {
  const session = await getSession({ req });

  try {
    if (session) {
      
    } else {
      res.status(404).json({ error: "You must be logged in" });
    }
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
