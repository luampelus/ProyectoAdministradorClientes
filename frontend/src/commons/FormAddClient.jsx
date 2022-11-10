// FORMULARIO PARA AGREGAR UN CLIENTE

import { useState } from "react";

const FormAddClient = () => {

  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [cliente, setCliente] = useState("")
  const [dolor, setDolor] = useState("")

  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <>
      <p className="text-lg text-center mb-10 mt-5">
        Agrega a tus clientes y {""}
        <span className="text-red-ceibo">adminístralos</span>
      </p>

      <form 
      className="mb-20 px-5"
      onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="nombre" className="font-bold">
            Cliente
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre del cliente u empresa"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="cliente" className="font-bold">
            A que se dedica
          </label>
          <input
            id="cliente"
            type="text"
            placeholder="Breve descripción sobre el cliente"
            className="border-2 w-full p-4 mt-2 placeholder-gray-400 rounded-md"
            value={cliente}
            onChange={e => setCliente(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de contacto"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="dolor" className="font-bold">
            Dolor
          </label>
          <input
            id="dolor"
            type="text"
            placeholder="Motivo de consulta o dolor del cliente"
            className="border-2 w-full p-4 mt-2 placeholder-gray-400 rounded-md"
            value={dolor}
            onChange={e => setDolor(e.target.value)}
          />
        </div>
        <input 
        type="submit"
        className="bg-purple-ceibo w-full p-3 text-white uppercase font-bold hover:cursor-pointer hover:bg-violet-700 transition-colors mt-6 rounded-lg"
        value="Agregar cliente"
        />
      </form>
    </>
  );
};

export default FormAddClient;
