import { Request, Response } from "express";
import { emailBodySchema } from "../utils/joiSchema";
import { EmailInfo, Origin } from "../types";
import { getTransporter } from "../utils/transporterMailer";
import { getUserAndPassEnv } from "../utils/getEnv";

export const buildAndSendEmail = async (
  req: Request & { origin?: string },
  res: Response
) => {
  const { name, email, subject, message } =
    (await emailBodySchema.validateAsync(req.body)) as EmailInfo;

  const isSW2Origin = req.origin === Origin.SW2 ? Origin.SW2 : Origin.SW1;

  const { user, pass } = getUserAndPassEnv(isSW2Origin);

  const customSubject =
    isSW2Origin === Origin.SW2
      ? "Site web - Cercle des vignerons"
      : `From portfolio - Nouveau message de ${name} : ${email}`;

  const transporter = getTransporter(user, pass);

  const mailOptions = {
    from: `WebSite <${user}>`,
    to: user,
    subject: customSubject,
    text: `           
      Nom: ${name}
      Email: ${email}

      Sujet : ${subject} 

      Message : ${message}`,
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
