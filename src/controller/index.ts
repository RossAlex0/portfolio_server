import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { EmailInfo } from "../types";

export const buildAndSendEmail = async (req: Request, res: Response) => {
  const { EMAIL_USER, EMAIL_PASSWORD } = process.env;

  const { name, email, subject, message } = req.body as EmailInfo;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: EMAIL_USER,
    to: EMAIL_USER,
    subject: `From portfolio - Nouveau message de ${name} : ${email}`,
    text: `           
       Nom: ${name}    ||    Email: ${email}

----------------------------------------------------

    Sujet : ${subject} 
      
      
${message}`,
  };

  await transporter
    .sendMail(mailOptions)
    .then(() =>
      res.status(200).json({
        message: `Merci ${name}, votre email concernant "${subject}" a bien été envoyé.\n Je vous recontacte au plus vite. 🚀`,
      })
    )
    .catch((error) =>
      res
        .status(500)
        .json({ message: "Erreur lors de l'envoi de l'email.", error })
    );
};
