import nodemailer from "nodemailer";

interface ISendEmailOptions {
  toEmail: string;
  subject: string;
  text: string;
}

export const sendEmail = async (options: ISendEmailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 0,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const msg = {
    from: process.env.FROM_EMAIL,
    to: options.toEmail,
    subject: options.subject,
    text: options.text,
  };

  // Send mail
  await transporter.sendMail(msg);
};
