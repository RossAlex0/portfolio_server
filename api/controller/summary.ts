import { Request, Response } from "express";
import { getAllUserAndPassEnv } from "../utils/getEnv";
import { getTransporter } from "../utils/transporterMailer";
import { Origin } from "../types";
import { getVercelAnalytics } from "../utils/getVercelAnalytics";
import { generateWeeklySummaryHTML } from "../utils/buildHTMLMail";

export const sendWeeklySummary = async (_req: Request, res: Response) => {
  const analyticsPf = await getVercelAnalytics(Origin.SW1);
  const analyticsCv = await getVercelAnalytics(Origin.SW2);

  const { user, pass, userClient, passClient } = getAllUserAndPassEnv();

  const transporter = getTransporter(user, pass);

  const transporterClient = getTransporter(userClient, passClient);

  const textHtmlBodyPf = generateWeeklySummaryHTML(
    analyticsPf.perDay,
    analyticsPf.total,
    "https://alex-rossignol.fr"
  );
  const textHtmlBodyCv = generateWeeklySummaryHTML(
    analyticsCv.perDay,
    analyticsCv.total,
    "https://cerclevignerons.com"
  );

  await transporter.sendMail({
    to: user,
    subject: "Résumé hebdomadaire des visites de votre site web",
    html: textHtmlBodyPf,
  });

  await transporterClient.sendMail({
    to: userClient,
    subject: "Résumé hebdomadaire des visites de votre site web",
    text: textHtmlBodyCv,
  });
  console.log("Weekly summary emails sent.");
  res.json({ message: "Emails de résumé hebdomadaire envoyés." });
};
