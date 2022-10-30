import { getSession } from "next-auth/react";

import teamsfeedbackhook from "../../../../libs/feedback/webhook/teams";

export default async function createRequest(req, res) {
  const session = await getSession({ req });

  const { feedback } = req.body;

  try {
    if (session) {
      if (feedback !== undefined) {
        await teamsfeedbackhook(feedback);
        res.status(200).json({ success: true, message: "feedback submitted" });
      }
    } else {
      res.status(404).json({ error: "You must be logged in" });
    }
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
