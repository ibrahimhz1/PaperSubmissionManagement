import nodemailer from 'nodemailer';

let transporter;

export function getTransporter() {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return transporter;
}

export async function sendEmail({ to, subject, html }) {
  const from = process.env.EMAIL_FROM || 'Research System <no-reply@example.com>';
  const info = await getTransporter().sendMail({ from, to, subject, html });
  return info;
}

export const templates = {
  verification: (link) => `<p>Please verify your email by clicking <a href="${link}">this link</a>.</p>`,
  reset: (link) => `<p>Reset your password by clicking <a href="${link}">this link</a>.</p>`,
  submissionConfirmation: (paperId) => `<p>Your submission has been received. Paper ID: <b>${paperId}</b></p>`,
  reviewerAssignment: (paperTitle) => `<p>You have been assigned to review: <b>${paperTitle}</b></p>`,
  reviewSubmitted: (paperTitle) => `<p>A review has been submitted for: <b>${paperTitle}</b></p>`,
  reviewOutcome: (paperTitle, status) => `<p>Your paper "${paperTitle}" outcome: <b>${status}</b></p>`,
};
