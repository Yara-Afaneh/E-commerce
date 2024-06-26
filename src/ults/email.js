import nodemailer from'nodemailer'


export async function sendEmail(to,subject,html){
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
          auth: {
            user: process.env.Emailsender,
            pass:process.env.passwordSender,
          },
          tls: {
            rejectUnauthorized: false
          }

      });
      const info = await transporter.sendMail({
        from: 'YaraShop', // sender address
        to, // list of receivers
        subject, // Subject line
        html, // html body
      });
    
      return info;
}

