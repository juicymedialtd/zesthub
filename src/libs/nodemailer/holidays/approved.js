import nodeMailer from "nodemailer";

export async function approveHoliday(email) {
    try {
        let mail;

        const url =
            process.env.NODE_ENV === "development"
                ? `http://localhost:3000/auth/invited?code=${code}`
                : `http://hub.zestsuite.com/auth/invited?code=${code}`;

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
            from: "hello@zestsuite.com", // sender address
            to: email,
            subject: `Holiday Request Approved`, // Subject line
            html: `<!doctype html>
        <html>
        <p>
        
        Hello! 
        <br>
        
        You're recent holiday request was approved.
        
        </p>
        
       
    
    
        </html>
        `,
        });

        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));
    } catch (error) {
        console.log(error);
    }
}
