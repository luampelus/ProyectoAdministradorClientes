import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateHeader = () => {

  const { cerrarSesion } = useAuth()

  return (
    <header className="py-7 bg-red-ceibo">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <img
          src="../../public/ceiboLogoLetras.png"
          class="ml w-40"
          alt="ceiboLogo"
        />

        <nav className="flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0">
          <Link to="/admin" className="text-white text-sm uppercase font-bold">
            Clientes
          </Link>
          <Link to="/perfil" className="text-white text-sm uppercase font-bold">
            Perfil
          </Link>
          <button
            type="button"
            className="text-white text-sm uppercase font-bold"
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default PrivateHeader;
