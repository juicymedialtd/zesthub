const { prisma } = require("../../../../../prisma/prisma");

export default async function handler(req, res) {
  const { id } = req.body;

  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    res.status(200).json({ success: true, message: "User deleted"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
