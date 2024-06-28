import nodemailer from'nodemailer'
import { emailTemplate } from './emailtemplate.js';


export async function sendEmail(to,subject,userName ='',token){
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
        html:emailTemplate(to,userName,token) // html body
      });
    
      return info;
}

