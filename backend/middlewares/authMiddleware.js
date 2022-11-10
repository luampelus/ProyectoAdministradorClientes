// ARCHIVO PARA CREAR EL CUSTOM MIDDLEWARE QUE VA A AUTENTICAR AL USUARIO Y PROTEGER A LAS PAGINAS SENSIBLES

import jwt from "jsonwebtoken";

import Ceiber from "../models/Ceiber.js";

const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.ceiber = await Ceiber.findById(decoded.id).select("-password");

      return next();
    } catch (error) {
      const errorUno = new Error("Token no valido");
      return res.status(403).json({ msj: errorUno.message });
    }
  }

  if (!token) {
    const errorDos = new Error("Token no valido o inexistente");
    res.status(403).json({ msj: errorDos.message });
  }

  next();
};

export default authMiddleware;
