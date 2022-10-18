import nodeMailer from "nodemailer";

export async function sendUserInvite(code, email, team) {
  try {
    let mail;

    console.log(email)

    const url = process.env.NODE_ENV === "development" ? `http://localhost:3000/auth/invited?code=${code}` : ''

    if (process.env.NODE_ENV === "development") {
      let testAccount = await nodeMailer.createTestAccount();
      mail = nodeMailer.createTransport({
        port: 1025,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
    } else {
      let testAccount = await nodeMailer.createTestAccount();
      mail = nodeMailer.createTransport({
        host: "",
        port: 1025,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
    }

    let info = await mail.sendMail({
      from: "hello@zestsuite.com", // sender address
      to: email,
      subject: `Zesthub Invitation`, // Subject line
      //   text: `Hello there, Ticket ${ticket.id}, which you reported on ${ticket.createdAt}, has now been created and logged`, // plain text body
      html: `<!doctype html>
        <html>
        <p>Hello! <br>You have been invited to join ${team} on ZestHub.</p>
        <div>
            <a href=${url}>Complete your invitation</a>
        </div>
        <p><br>Thanks, <br> ZestHub
    
    
        </html>
        `,
    });

    console.log("Message sent: %s", info.messageId);

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
}
