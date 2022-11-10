// VISTA DE OLVIDÉ MI CONTRASEÑA

import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ValidationMessages from "./ValidationMessages";

const forgotPassword = () => {
  const [email, setEmail] = useState("")
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(email === "" ) {
      setAlerta({msj: "El email es obligatorio", error: true})
      return
    }
    
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/ceibers/olvide-password`
      const { data } = await axios.post(url, {email})
      setAlerta({msj: data.msj})
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
          Recupera tu cuenta
        </h1>
        <h2 className="text-red-ceibo font-black text-5xl">
          y no pierdas el acceso a tus clientes.
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
            <label className="block text-xl">Email</label>
            <input
              type="email"
              placeholder="Correo electronico"
              className="border w-full p-2 mt-1 rounded-lg"
              value={email}
              onChange = {e => setEmail(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Enviar enlace para restablecer la contraseña"
            className="bg-light-blue-ceibo w-full py-3 px-10 rounded-lg text-white uppercase font-bold mt-3 hover:cursor-pointer hover:bg-cyan-400"
          />
        </form>
        <nav className="mt-6 lg:flex lg:justify-between">
          <Link className="block text-center my-2" to="/">
            Volver al inicio de sesión
          </Link>
          <Link className="block text-center my-2" to="/register">
            ¿No tienes una cuenta? Regístrate
          </Link>
        </nav>
      </div>
    </>
  );
};

export default forgotPassword;
