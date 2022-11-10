// VISTA DE INICIAR SESIÓN

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ValidationMessages from "./ValidationMessages";
import useAuth from "../hooks/useAuth";

const Login = () => {

  const [email, setEmail] = useState("")
  const [ password, setPassword] = useState("")
  const [alerta, setAlerta] = useState({})

  const { setAuth } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([email, password].includes('')){
      setAlerta({ msj: "Todos los campos son obligatorios",
      error: true 
    });

      return;
    }

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/ceibers/login`;
      const { data } = await axios.post(url, {email, password})
      localStorage.setItem("token", data.token)
      setAuth(data)
      navigate("/admin")
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
          Bienvenido, <span className="text-white">CEIBER.</span>
        </h1>
        <h2 className="text-red-ceibo font-black text-5xl mt-4">
          Inicia sesion para comenzar a administrar tus clientes.
        </h2>
        <img
          src="../../public/ceiboLogo.png"
          class="mx-auto pt-10 md:pr-20"
          alt="ceiboLogo"
        />
      </div>
      <div>
        { msj && <ValidationMessages
        alerta={alerta}
        />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="block text-xl">Email</label>
            <input
              type="email"
              placeholder="Correo electrónico"
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
            value="Iniciar sesion"
            className="bg-light-blue-ceibo w-full py-3 px-10 rounded-lg text-white uppercase font-bold mt-3 hover:cursor-pointer hover:bg-cyan-400"
          />
        </form>
        <nav className="mt-6 lg:flex lg:justify-between">
          <Link className="block text-center my-2" to="/olvide-password">
            ¿Olvidaste tu contraseña?
          </Link>
          <Link className="block text-center my-2" to="/register">
            ¿No tienes una cuenta? Regístrate
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;
