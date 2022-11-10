// VISTA DE CONFIRMAR CUENTA

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ValidationMessages from "./ValidationMessages";

const ConfirmAccount = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/ceibers/confirmar/${id}`;
        const { data } = await axios(url);
        setCuentaConfirmada(true);
        setAlerta({
          msj: data.msj,
        });
      } catch (error) {
        setAlerta({
          msj: error.response.data.msj,
          error: true,
        });
      }

      setCargando(false);
    };
    confirmarCuenta();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-purple-ceibo font-black text-6xl">
          Confirma tu cuenta
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
        {!cargando && <ValidationMessages alerta={alerta} />}
        {cuentaConfirmada && (
          <Link to="/">
            <input
              type="submit"
              value="Iniciar sesion"
              className="bg-light-blue-ceibo w-full py-3 px-10 rounded-lg text-white uppercase font-bold mt-3 hover:cursor-pointer hover:bg-cyan-400"
            />
          </Link>
        )}
      </div>
    </>
  );
};



export default ConfirmAccount;
