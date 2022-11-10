// ARCHIVO DONDE VAMOS A DEFINIR NUESTRA APLICACIÓN

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layout/AuthLayout";

import PrivateLayout from "./layout/PrivateLayout";

import Login from "./components/Login";
import Register from "./components/Register";
import ConfirmAccount from "./components/ConfirmAccount";
import ForgotPassword from "./components/ForgotPassword";
import NewPassword from "./components/NewPassword";
import AdminClients from "./components/AdminClients";

import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="confirmar/:id" element={<ConfirmAccount />} />
            <Route path="olvide-password" element={<ForgotPassword />} />
            <Route path="olvide-password/:token" element={<NewPassword />} />
          </Route>

          <Route path="/admin" element={<PrivateLayout />}>
            <Route index element={<AdminClients />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
