// ARCHIVO PARA ENVIAR EL EMAIL DE OLVIDE MI CONTRASEÑA

import nodemailer from "nodemailer";

const emailForgotPassword = async (datos) => {
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
    subject:
      "Restablece tu contraseña - Administrador de Clientes | Ceibo Digital",
    text: "Restablece tu contraseña - Administrador de Clientes | Ceibo Digital",
    html: `<p>Hola, ${nombre}. Haz click en el siguiente enlace para restablecer tu contraseña:
            <a href="${process.env.URL_FRONTEND}/olvide-password/${token}">RESTABLECER CONTRASEÑA</a></p>
            
            <p>Si no fuise vos quien solicitó el cambio de contraseña, podes ignorar éste mensaje</p>
        `,
  });

  console.log("Email enviado: %s", info.messageId);
};

export default emailForgotPassword;
