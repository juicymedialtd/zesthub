import nodeMailer from "nodemailer";

// Email admins & email user saying holiday requested

export default async function HolidayCreationEmail(user, name, admins) {
  try {
    let mail;

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
      mail = nodeMailer.createTransport({
        host: process.env.SMTP_ENDPOINT,
        port: 587,
        secureConnection: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      });
    }

    let info = await mail.sendMail({
      from: "holidays@zestsuite.com", // sender address
      to: user,
      subject: `Holiday Request Created`, // Subject line
      html: `<!doctype html>
        <html>
        <p>
        Hello! 
        <br>
        You're recent holiday request has been logged and will be looked at by one of your team admins shortly.
        <br>
        regards,
        <br>
        ZestHub
        </p>
        </html>
        `,
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));

    for (let k = 0; k < admins.length; k++) {
      let info = await mail.sendMail({
        from: "holidays@zestsuite.com", // sender address
        to: admins.email,
        subject: `Holiday Request Created`, // Subject line
        html: `<!doctype html>
              <html>
              <p>
              Hello! 
              <br>
              ${name}, has just requested
              <br>
              regards,
              <br>
              ZestHub
              </p>
              </html>
              `,
      });

      console.log("Message sent: %s", info.messageId);

      console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));
    }
  } catch (error) {
    console.log(error);
  }
}
