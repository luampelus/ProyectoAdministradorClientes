// ARCHIVO PARA CREAR LAS RUTAS DE CLIENTE

import express from "express";

import {
  addClient,
  getClients,
  getClient,
  updateClient,
  deleteClient,
} from "../controllers/clienteController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addClient);

router.get("/", authMiddleware, getClients);

router.get("/:id", authMiddleware, getClient);

router.put("/:id", authMiddleware, updateClient);

router.delete("/:id", authMiddleware, deleteClient);

export default router;
