// ARCHIVO LAYOUT PARA LAS PAGINAS PRIVADAS QUE COMPARTEN UN MISMO DISEÑO

import { Outlet, Navigate } from "react-router-dom";
import PrivateHeader from "../commons/PrivateHeader";
import Footer from "../commons/Footer";
import useAuth from "../hooks/useAuth";

const PrivateLayout = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return "cargando...";

  return (
    <>
      <PrivateHeader />

      {auth?._id ? (
        <main className="container mx-auto mt-10 font-abc">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" />
      )}

      <Footer />
    </>
  );
};

export default PrivateLayout;
