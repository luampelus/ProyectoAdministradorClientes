// ALERTAS/MENSAJES DE VALIDACIÓN PARA EL REGISTRO DE USUARIOS

const ValidationMessages = ({ alerta }) => {
  return (
    <div
      className={`${
        alerta.error
          ? "from-red-600 to-red-ceibo"
          : "from-light-blue-ceibo to-sky-500"
      } bg-gradient-to-r text-center p-2 rounded-lg text-white text-sm my-5`}
    >
      {alerta.msj}
    </div>
  );
};

export default ValidationMessages;
