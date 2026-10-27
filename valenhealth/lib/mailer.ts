import nodemailer from "nodemailer";

// Port 465 + secure:true (SSL) is required on Vercel/AWS.
// Port 587 STARTTLS is blocked by Vercel's infrastructure.
const port = Number(process.env.SMTP_PORT) || 465;
const isSecure = process.env.SMTP_SECURE === "true" || port === 465;

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port,
  secure: isSecure,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
} as any);
