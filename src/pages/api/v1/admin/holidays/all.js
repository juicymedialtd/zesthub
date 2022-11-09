const {prisma} = require("../../../../../prisma/prisma";

export default async function handler(req, res) {
    try {

        const holidays = await prisma.holiday.findMany({
            include: {
                User: {
                    select: {
                        name: true,
                        profileUrl: true
                    }
                }
            }
        })

        res.status(200).json({success: true, holidays})

    } catch (err) {
        console.log(err)
        res.status(500).json({success: false, err})
    }
}
