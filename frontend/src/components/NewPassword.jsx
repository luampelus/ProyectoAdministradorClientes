// VISTA DE RESTABLECER CONTRASEÑA

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ValidationMessages from "./ValidationMessages";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/ceibers/olvide-password/${token}`;
        await axios.get(url);
        setAlerta({
          msj: "Ingresa tu nueva contraseña",
        });
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msj: "Hubo un error en el enlace",
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password.length < 8) {
      setAlerta({
        msj: "La contraseña es demasiado corta, debe tener un mínimo de 8 caracteres",
        error: true
      })
      return
    }

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/ceibers/olvide-password/${token}`;
      const { data } = await axios.post(url, {password})
      setAlerta({
        msj: data.msj
      })
      setPasswordModificado(true)
    } catch (error) {
      setAlerta({
        msj: error.response.data.msj,
        error: true
      })
    }
  }

  const { msj } = alerta;

  return (
    <>
      <div>
        <h1 className="text-purple-ceibo font-black text-6xl">
          Restablece tu contraseña
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
        {msj && <ValidationMessages alerta={alerta} />}
        {tokenValido && (
          <>
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="block text-xl">Nueva contraseña</label>
              <input
                type="password"
                placeholder="Nueva contraseña"
                className="border w-full p-2 mt-1 rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <input
              type="submit"
              value="Restablecer contraseña"
              className="bg-light-blue-ceibo w-full py-3 px-10 rounded-lg text-white uppercase font-bold mt-3 hover:cursor-pointer hover:bg-cyan-400"
            />
          </form>
          </>
        )}
        {passwordModificado && <Link to="/">
            <input
              type="submit"
              value="Iniciar sesion"
              className="bg-light-blue-ceibo w-full py-3 px-10 rounded-lg text-white uppercase font-bold mt-3 hover:cursor-pointer hover:bg-cyan-400"
            />
          </Link>}
      </div>
    </>
  );
};

export default NewPassword;
