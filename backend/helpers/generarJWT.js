// ARCHIVO PARA CREAR LA FUNCION QUE VA A GENERAR EL JWT

import jwt from "jsonwebtoken";

const generarJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generarJWT;
