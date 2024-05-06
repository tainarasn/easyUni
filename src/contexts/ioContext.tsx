import React from "react"
import { createContext, useEffect } from "react"
import { Socket, io as ioSocket } from "socket.io-client"
import { url } from "../api/backend"
import { api } from "../api"
import { useSnackbar } from "burgos-snackbar"

interface IoContextValue {
    io: Socket
}

interface IoProviderProps {
    children: React.ReactNode
}

const IoContext = createContext<IoContextValue>({} as IoContextValue)

export default IoContext

const io = ioSocket(`ws${url}`)

export const IoProvider: React.FC<IoProviderProps> = ({ children }) => {
    const { snackbar } = useSnackbar()
    useEffect(() => {
        io.once("connect_error", (error) => {
            console.log(error)
            // snackbar({ severity: "error", text: "Não foi possível se conectar com o servidor." })

            api.get("/").then((response) => {
                console.log(response.data)
            })
        })

        io.on("connect", () => {
            snackbar({ severity: "success", text: "Conectado!" })
        })

        io.on("disconnect", (reason) => {
            if (reason == "io client disconnect" || reason == "io server disconnect") {
                ;("Desconectado do servidor")
            } else {
                ;("Conexão com o servidor perdida! Tentando reconectar automaticamente")
            }
        })

        return () => {
            io.off("connect_error")
            io.off("connect")
            io.off("disconnect")
        }
    }, [])

    return <IoContext.Provider value={{ io }}>{children}</IoContext.Provider>
}
