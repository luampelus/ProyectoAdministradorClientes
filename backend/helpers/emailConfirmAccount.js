// ARCHIVO PARA ENVIAR EL EMAIL DE CONFIRMAR CUENTA

import nodemailer from "nodemailer";

const emailConfirmAccount = async (datos) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, nombre, token } = datos;

  const info = await transporter.sendMail({
    from: "Administrador de Clientes | Ceibo Digital",
    to: email,
    subject: "Confirma tu cuenta - Administrador de Clientes | Ceibo Digital",
    text: "Confirma tu cuenta - Administrador de Clientes | Ceibo Digital",
    html: `<p>Hola, ${nombre}! Gracias por unirte a Ceibo! Confirma tu cuenta para comenzar a administrar tus clientes:
            <a href="${process.env.URL_FRONTEND}/confirmar/${token}">CONFIRMAR CUENTA</a></p>
            
            <p>Si no fuise vos quien creó la cuenta, podes ignorar esté mensaje</p>
        `,
  });

  console.log("Email enviado: %s", info.messageId);
};

export default emailConfirmAccount;
