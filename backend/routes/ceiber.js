// ARCHIVO PARA CREAR LAS RUTAS DE CEIBER

import express from "express";

const router = express.Router();

import {
  register,
  confirm,
  login,
  forgotPassword,
  validateToken,
  newPassword,
  profile,
} from "../controllers/ceiberController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

router.post("/", register);

router.get("/confirmar/:token", confirm);

router.post("/login", login);

router.post("/olvide-password", forgotPassword);

router.get("/olvide-password/:token", validateToken);

router.post("/olvide-password/:token", newPassword);

router.get("/perfil", authMiddleware, profile);

export default router;
