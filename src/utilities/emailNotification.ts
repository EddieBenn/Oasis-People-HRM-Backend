import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.GMAIL_USER}`,
    pass: `${process.env.GMAIL_PASSWORD}`,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendMail = async (to: string, password: string, email: string) => {
  const maxRetries = 4;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const response = await transport.sendMail({
        from: `${process.env.GMAIL_USER}`,
        to,
        subject: "Welcome to Oasis Industries, below are your login details",
        html: `<div width="50%" style="text-align: center; padding: 25px; border-radius: 5px; border: 2px solid #27AE60;"><h1>Welcome to Oasis Industries</h1>
              <p style="margin-bottom: 10px">Email: ${email}</p>
              <br />
              <p style="margin-bottom: 10px">Password: ${password}</p>
              <br />
              <p>Thank you.</p>`,
      });
      console.log('Email sent successfully');
      break;
    } catch (error: any) {
      attempt++;
      console.log(`Attempt ${attempt} failed: ${error.message}`);
      if (attempt >= maxRetries) {
        console.log('All attempts to send email failed');
      }
    }
  }
};
