import nodemailer from "nodemailer";

// Port 465 + secure:true (SSL) is required on Vercel/AWS.
// Port 587 STARTTLS is blocked by Vercel's infrastructure.
// Set SMTP_PORT=465 and SMTP_SECURE=true in Vercel env vars.
// SMTP_HOST, SMTP_USER, SMTP_PASS remain unchanged.
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 15000,
} as any);
