// ARCHIVO PARA DEFINIR EL MODELO DE LOS CLIENTES

import mongoose from "mongoose";

const clienteSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    cliente: {
      type: String,
      required: true,
    },
    dolor: {
      type: String,
      required: true,
    },
    solucion: {
      type: String,
      default: null,
    },
    resultados: {
      type: String,
      default: null,
    },
    ceiber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ceiber",
    },
  },
  {
    timestamps: true,
  }
);

const Cliente = mongoose.model("Cliente", clienteSchema);

export default Cliente;
