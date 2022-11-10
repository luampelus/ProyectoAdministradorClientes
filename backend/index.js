// ARCHIVO PARA LA CONFIGURACIÓN DEL SERVIDOR

// importamos a express
import express from "express";

// importamos a dotenv, una dependencia que nos va a permitir leer variables de entorno guardadas en el archivo .env
import dotenv from "dotenv";

import cors from "cors";

// importamos el archivo de conexión a la db
import conectarDB from "./config/db.js";

// importamos el router de ceiber
import ceiber from './routes/ceiber.js'

// importamos el router de cliente
import cliente from './routes/cliente.js'

// instanciamos a express en la variable app y vamos a tener todas las funcionalidades que nos van a permitir crear el servidor
const app = express();

// escribimos el middleware express.json
// Importante: Hay que agregarlo siempre antes de la definición de las rutas.
app.use(express.json()); // esto parsea o formatea la información recibida dentro de req.body de tipo json en algo que nuestro servidor pueda interpretar

// leemos el archivo .env
dotenv.config();

// invocamos a la función para conectarnos a la db
conectarDB();

const dominiosPermitidos = [process.env.URL_FRONTEND]

const corsOptions = {
  origin: function(origin, callback) {
    if(dominiosPermitidos.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("No permitido por cors"))
    }
  }
}

app.use(cors(corsOptions));

// manejamos las rutas de ceibers y clientes
app.use("/api/ceibers", ceiber);
app.use("/api/clientes", cliente);

// declaramos el PORT con la variable de entorno guardada en el archivo .env, la cual se va a asignar automaticamente cuando hagamos el deployment del proyecto
const PORT = process.env.PORT || 4000; // le decimos que si todavía no existe, le asigne el puerto 4000

// le decimos que escuche el servidor en el puerto que definimos recien
app.listen(PORT, () => {
  console.log("Servidor funcionando en el puerto 4000");
});
