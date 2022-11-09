import prisma from"../../../../../../prisma/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const session = await getSession({ req });

    const { id } = req.query

    try{
        if (session) {

            const hol = await prisma.holiday.delete({
                where: {
                    id
                }
            })

            if(hol.status === 'approved') {
                await prisma.user.update({
                    where: {
                        id: session.user.id
                    },
                    data: {
                        holidaysLeft: {
                            increment: Number(hol.daysUsed)
                        }
                    }
                })
            }

            res.status(200).json({ success: true, message: 'Holiday Deleted' });
        } else {
            res.status(404).json({ error: "You must be logged in" });
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false, message: e })
    }
}