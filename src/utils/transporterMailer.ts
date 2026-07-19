import nodemailer from "nodemailer";

export const getTransporter = (user: string, pass: string) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user,
      pass,
    },
  });

  return transporter;
};
