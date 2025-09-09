import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { EmailInfo, Origin } from "../../types";

export const buildAndSendEmail = async (req: Request, res: Response) => {
  const {
    EMAIL_USER,
    EMAIL_PASSWORD,
    EMAIL_USER_CLIENT,
    EMAIL_PASSWORD_CLIENT,
  } = process.env;

  const { name, email, subject, message } = req.body as EmailInfo;

  const _subject =
    (req as any).origin === Origin.SW2
      ? "Site web - Cercle des vignerons"
      : `From portfolio - Nouveau message de ${name} : ${email}`;

  const user =
    (req as any).origin === Origin.SW2 ? EMAIL_USER_CLIENT : EMAIL_USER;

  const pass =
    (req as any).origin === Origin.SW2 ? EMAIL_PASSWORD_CLIENT : EMAIL_PASSWORD;

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
    subject: _subject,
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
