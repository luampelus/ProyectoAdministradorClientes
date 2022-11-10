// ARCHIVO PARA DEFINIR EL MODELO DE LOS CEIBERS

import mongoose from "mongoose";

import bcrypt from "bcrypt";

import generarId from "../helpers/generarId.js";

const ceiberSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  cargo: {
    type: String,
    default: null,
    trim: true,
  },
  linkedIn: {
    type: String,
    default: null,
    trim: true,
  },
  token: {
    type: String,
    default: generarId(),
  },
  confirmado: {
    type: Boolean,
    default: false,
  },
});

ceiberSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

ceiberSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password);
};

const Ceiber = mongoose.model("Ceiber", ceiberSchema);

export default Ceiber;
