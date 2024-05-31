import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const EMAIL_PASS = process.env.EMAIL_PASS;
const PORT = process.env.PORT;
const config = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "royalesuperr@gmail.com",
    pass: EMAIL_PASS ?? "",
  },
};

export async function sendConfirmationEmail({ token, email }) {
  const confirmationUrl = `http://localhost:${
    PORT ?? 3030
  }/confirm?token=${token}`;
  const message = {
    from: "royalesuperr@gmail.com",
    to: email,
    subject: "Confirma tu cuenta",
    html: `<p>Hola, para confirmar tu cuenta, haz click en el siguiente link:</p><p><a href="${confirmationUrl}">Confirma tu cuenta</a></p>`,
  };

  const transport = nodemailer.createTransport(config);
  await transport.sendMail(message);
}

export async function sendResetPasswordEmail({ token, email }) {
  console.log(email);
  const resetUrl = `http://localhost:${
    PORT ?? 3030
  }/login/change-password?token=${token}`;
  const message = {
    from: "royalesuperr@gmail.com",
    to: email,
    subject: "Confirma tu cuenta",
    html: `<p>Hola, para reestablecer tu contraseña, haz click en el siguiente link:</p><p><a href="${resetUrl}">Reestablecer contraseña</a></p>`,
  };

  const transport = nodemailer.createTransport(config);
  await transport.sendMail(message);
}
