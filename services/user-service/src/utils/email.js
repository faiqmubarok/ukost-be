import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendResetPasswordEmail = async (to, resetLink) => {
  const mailOptions = {
    from: `"U Kost" <${process.env.SMTP_USER}>`,
    to,
    subject: "Reset Password",
    html: `
      <p>You requested to reset your password.</p>
      <p><a href="${resetLink}">Click here to reset</a></p>
      <p>This link will expire in 1 hour.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
