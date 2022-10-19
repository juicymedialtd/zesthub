import bcrypt from "bcrypt";

const { prisma } = require("../../../../prisma/prisma");

export default async function handler(req, res) {
  const { email, password, code, name } = req.body;

  try {
    if (email && password && code) {
      const invite = await prisma.invites.findMany({
        where: {
          code: code,
        },
      });

      if (invite[0].email === email) {
        console.log("email is the same");

        const hash = await bcrypt.hash(password, 10);

        await prisma.user.create({
          data: {
            name,
            email,
            teamId: invite[0].teamID,
            password: hash,
          },
        });
      }

      res.redirect(307, '/auth/login')

    //   res.status(200).json({ sucess: true, message: "Signed up successfully" });
    } else {
      res.status(403).json({ sucess: true, message: "Missing fields" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, error });
  }
}
