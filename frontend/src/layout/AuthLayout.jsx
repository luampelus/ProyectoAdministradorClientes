// ARCHIVO LAYOUT PARA LAS PAGINAS DE AUTENTICACIÓN QUE COMPARTEN

import { Outlet } from "react-router-dom";
import PublicHeader from "../commons/PublicHeader";
import Footer from "../commons/Footer";

const AuthLayout = () => {
  return (
    <>
      <PublicHeader />
      <main className="container mx-auto md:grid md:grid-cols-2 my-40 gap-12 font-abc">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AuthLayout;
