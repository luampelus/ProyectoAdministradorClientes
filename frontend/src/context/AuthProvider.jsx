// ARCHIVO FUENTE DE DONDE NACE EL ESTADO GLOBAL DE TODA LA APP
import { useState, useEffect, createContext } from "react"
import axios from "axios";

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [cargando, setCargando] = useState(true);
    const [ auth, setAuth ] = useState({})

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token")

            if(!token) {
                setCargando(false)
                return
            }

            const config = {
                headers: {
                   "Content-Type": "application/json",
                   Authorization: `Bearer ${token}`
                }
            }

            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/ceibers/perfil`;
                const { data } = await axios.get(url, config)

                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msj);
                setAuth({})
            }

            setCargando(false)
        }
        autenticarUsuario()
    },[])

    const cerrarSesion = () => {
        localStorage.removeItem("token")
        setAuth({})
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext