// VISTA DE REGISTRARSE

import { useState } from "react"
import { Link } from "react-router-dom";
import axios from "axios";
import ValidationMessages from "./ValidationMessages";

const Register = () => {
  const [ nombre, setNombre] = useState("")
  const [ email, setEmail] = useState("")
  const [ password, setPassword] = useState("")

  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([nombre, email, password].includes('')){
      setAlerta({ msj: "Hay campos vacios", error: true });
      return;
    }
    
    if(password.length < 8) {
      setAlerta({ msj: "La contraseña es demasiado corta, debe tener un mínimo de 8 caracteres", error: true });
      return;
    }

    setAlerta({})

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/ceibers`
      await axios.post(url, { nombre, email, password})
      setAlerta({
        msj: "Gracias por unirte a Ceibo! Te hemos enviado un email para verificar tu cuenta"
      })
    } catch (error) {
      setAlerta({
        msj: error.response.data.msj,
        error: true
      })
    }
  }

  const { msj } = alerta

  return (
    <>
      <div>
        <h1 className="text-purple-ceibo font-black text-6xl">
          Crea tu cuenta
        </h1>
        <h2 className="text-red-ceibo font-black text-5xl">
          para comenzar a formar parte de{" "}
          <span className="text-white">Ceibo Digital</span> y administrar tus
          clientes.
        </h2>
        <img
          src="../../public/ceiboLogo.png"
          class="mx-auto pt-6 md:pr-20"
          alt="ceiboLogo"
        />
      </div>
      <div>
        { msj && <ValidationMessages
        alerta={alerta}
        />}
        <form
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label className="block text-xl">Nombre completo</label>
            <input
              type="text"
              placeholder="Nombre"
              className="border w-full p-2 mt-1 rounded-lg"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="block text-xl">Email</label>
            <input
              type="email"
              placeholder="Correo electronico"
              className="border w-full p-2 mt-1 rounded-lg"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="block text-xl">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              className="border w-full p-2 mt-1 rounded-lg"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Registrarte"
            className="bg-light-blue-ceibo w-full py-3 px-10 rounded-lg text-white uppercase font-bold mt-3 hover:cursor-pointer hover:bg-cyan-400"
          />
        </form>
        <nav className="mt-6 lg:flex lg:justify-between">
          <Link className="block text-center my-2" to="/">
          ¿Tienes una cuenta? Inicia sesión
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Register;
