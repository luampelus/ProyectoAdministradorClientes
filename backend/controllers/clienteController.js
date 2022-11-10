// ARCHIVO PARA CREAR LOS CONTROLADORES (funciones) DE LAS RUTAS DE CLIENTE

import Cliente from "../models/Cliente.js";

// controller para AGREGAR UN CLIENTE
const addClient = async (req, res) => {
  const cliente = new Cliente(req.body);
  cliente.ceiber = req.ceiber._id;
  try {
    const clienteAlmacenado = await cliente.save();
    res.json(clienteAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

// controller para OBTENER TODOS LOS CLIENTES de un usuario
const getClients = async (req, res) => {
  const clientes = await Cliente.find().where("ceiber").equals(req.ceiber);
  res.json(clientes);
};

// creamos el controller para OBTENER UN CLIENTE en especifico
const getClient = async (req, res) => {
  const { id } = req.params;
  const cliente = await Cliente.findById(id);

  if (!cliente) {
    return res.status(404).json({ msj: "Cliente no encontrado" });
  }

  if (cliente.ceiber._id.toString() !== req.ceiber._id.toString()) {
    return res.json({ msj: "Acción no válida" });
  }

  res.json(cliente);
};

// creamos el controller para EDITAR UN CLIENTE en especifico
const updateClient = async (req, res) => {
  const { id } = req.params;
  const cliente = await Cliente.findById(id);

  if (!cliente) {
    return res.status(404).json({ msj: "Cliente no encontrado" });
  }

  if (cliente.ceiber._id.toString() !== req.ceiber._id.toString()) {
    return res.json({ msj: "Acción no válida" });
  }

  cliente.nombre = req.body.nombre || cliente.nombre;
  cliente.email = req.body.email || cliente.email;
  cliente.dolor = req.body.dolor || cliente.dolor;
  cliente.solucion = req.body.solucion || cliente.solucion;
  cliente.resultados = req.body.resultados || cliente.resultados;

  try {
    const clienteActualizado = await cliente.save();
    res.json(clienteActualizado);
  } catch (error) {
    console.log(error);
  }
};

// controller para ELIMINAR UN CLIENTE en especifico
const deleteClient = async (req, res) => {
  const { id } = req.params;
  const cliente = await Cliente.findById(id);

  if (!cliente) {
    return res.status(404).json({ msj: "Cliente no encontrado" });
  }

  if (cliente.ceiber._id.toString() !== req.ceiber._id.toString()) {
    return res.json({ msj: "Acción no válida" });
  }

  try {
    await cliente.deleteOne();
    res.json({ msj: "Cliente eliminado" });
  } catch (error) {
    console.log(error);
  }
};

export { addClient, getClients, getClient, updateClient, deleteClient };
