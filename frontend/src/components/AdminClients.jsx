// VISTA DE ADMINISTRAR CLIENTES

import { useState } from "react";
import FormAddClient from "../commons/FormAddClient"
import ClientList from "../commons/ClientList"

const AdminClients = () => {

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 lg:w-2/5">
        <FormAddClient/>
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <ClientList/>
      </div>
    </div>
  )
}

export default AdminClients