import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { EmailInfo, Origin } from "../../types";

export const buildAndSendEmail = async (
  req: Request & { origin?: string },
  res: Response
) => {
  const {
    EMAIL_USER,
    EMAIL_PASSWORD,
    EMAIL_USER_CLIENT,
    EMAIL_PASSWORD_CLIENT,
  } = process.env;

  const { name, email, subject, message } = req.body as EmailInfo;

  const isSW2Origin = req.origin === Origin.SW2;

  const customSubject = isSW2Origin
    ? "Site web - Cercle des vignerons"
    : `From portfolio - Nouveau message de ${name} : ${email}`;

  const user = isSW2Origin ? EMAIL_USER_CLIENT : EMAIL_USER;

  const pass = isSW2Origin ? EMAIL_PASSWORD_CLIENT : EMAIL_PASSWORD;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user,
      pass,
    },
  });

  const mailOptions = {
    from: `WebSite <${user}>`,
    to: user,
    subject: customSubject,
    text: `           
       Nom: ${name}    ||    Email: ${email}

----------------------------------------------------

    Sujet : ${subject} 
      
      
${message}`,
  };

  transporter
    .sendMail(mailOptions)
    .then(() =>
      res.status(200).json({
        message: `Merci ${name}, votre email concernant "${subject}" a bien été envoyé.\n Je vous recontacte au plus vite. 🚀`,
      })
    )
    .catch((error) => res.status(500).json(error));
};
