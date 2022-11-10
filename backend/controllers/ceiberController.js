// ARCHIVO PARA CREAR LOS CONTROLADORES (funciones) DE LAS RUTAS DE CEIBER

import Ceiber from "../models/Ceiber.js";

import generarJWT from "../helpers/generarJWT.js";

import generarId from "../helpers/generarId.js";

import emailConfirmAccount from "../helpers/emailConfirmAccount.js";

import emailForgotPassword from "../helpers/emailForgotPassword.js";

// controller para REGISTRAR UN USUARIO
const register = async (req, res) => {
  const { nombre, email, password } = req.body;

  const existeUsuario = await Ceiber.findOne({ email });
  if (existeUsuario) {
    const error = new Error("Ya existe un usuario registrado con ese email");
    return res.status(400).json({ msj: error.message });
  }

  try {
    const ceiber = new Ceiber(req.body);
    const ceiberGuardado = await ceiber.save();

    emailConfirmAccount({
      email,
      nombre,
      token: ceiberGuardado.token,
    });

    res.json(ceiberGuardado);
  } catch (error) {
    console.log(error);
  }
};

// controller para CONFIRMAR LA CUENTA DEL USUARIO via token
const confirm = async (req, res) => {
  const { token } = req.params;

  const usuarioConfirmar = await Ceiber.findOne({ token });

  if (!usuarioConfirmar) {
    const error = new Error("Token no valido");
    return res.status(404).json({ msj: error.message });
  }

  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();
    res.json({ msj: "Cuenta confirmada correctamente" });
  } catch (error) {
    console.log(error);
  }
};

// controller para INICIAR SESIÓN
const login = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Ceiber.findOne({ email });

  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msj: error.message });
  }

  if (!usuario.confirmado) {
    const error = new Error(
      "Tu cuentá aun no ha sido confirmada. Por favor revisa tu email"
    );
    return res.status(403).json({ msj: error.message });
  }

  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario.id),
    });
  } else {
    const error = new Error("Contraseña incorrecta");
    return res.status(403).json({ msj: error.message });
  }
};

// controller para CAMBIAR EL PASSWORD DEL USUARIO en caso de que este lo olvide
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const existeUsuario = await Ceiber.findOne({ email });
  if (!existeUsuario) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msj: error.message });
  }

  try {
    existeUsuario.token = generarId();
    await existeUsuario.save();

    emailForgotPassword({
      email,
      nombre: existeUsuario.nombre,
      token: existeUsuario.token,
    });

    res.json({ msj: "Hemos enviado un email con las instrucciones" }); // enviamos una respuesta de tipo json al navegador
  } catch (error) {}
};

// controller para VALIDAR EL TOKEN que le enviamos al usuario por mail, el cual sirve para cambiar el password
const validateToken = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await Ceiber.findOne({ token });

  if (tokenValido) {
    res.json({ msj: "Token valido y el usuario existe" });
  } else {
    const error = new Error("Token no valido");
    return res.status(400).json({ msj: error.message });
  }
};

// creamos el controller para QUE EL USUARIO DEFINA SU NUEVO PASSWORD
const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const ceiber = await Ceiber.findOne({ token });
  if (!ceiber) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msj: error.message });
  }

  try {
    ceiber.token = null;
    ceiber.password = password;
    await ceiber.save();
    res.json({ msj: "Contraseña modificada correctamente" });
  } catch (error) {
    console.log(error);
  }
};

// controller para MOSTRAR EL PERFIL DEL USUARIO
const profile = (req, res) => {
  const { ceiber } = req;
  res.json({ perfil: ceiber });
};

export {
  register,
  confirm,
  login,
  forgotPassword,
  validateToken,
  newPassword,
  profile,
};
