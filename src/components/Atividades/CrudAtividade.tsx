import React, { useEffect, useState } from "react"
import { Box, Divider } from "@mui/material"
import { User } from "../../types/server/class/user"
import { api } from "../../api"
import { Activity } from "../../types/server/class/activity"

interface CrudAtividadeProps {
    user: User
}

export const CrudAtividade: React.FC<CrudAtividadeProps> = ({ user }) => {
    const [listAtividade, setListAtividades] = useState<Activity[]>([])

    const fetchActivity = async () => {
        try {
            const response = await api.get("/activity/all")
            setListAtividades(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const sum = listAtividade
        .filter((item) => item.studentId === user.student?.id)
        .reduce((acc, curr) => {
            return acc + parseFloat(curr.totalHours) // Convertendo para número e acumulando
        }, 0)

    useEffect(() => {
        fetchActivity()
        console.log()
    }, [])
    return (
        <Box
            sx={{
                width: "30%",
                height: "100%",
                bgcolor: "#EBEBEB",
                borderRadius: "1vw",
                p: "2vw",
                flexDirection: "column",
                gap: "1vw",
            }}
        >
            <p style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Resumo das Atividades</p>
            <Box sx={{ flexDirection: "column" }}>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Campus:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{user.student?.course.campus}</p>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Curso:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{user.student?.course.name}</p>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Matriz:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{user.student?.course.matriz}</p>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Total de Horas:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{user.student?.course.totalHours}h</p>
                </Box>
            </Box>
            <Divider />
            <Box sx={{ flexDirection: "column" }}>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Atividades Complementares:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{user.student?.course.totalHoursActivites}h</p>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Realizadas :</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{sum}h</p>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Faltantes :</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                        {user.student?.course.totalHoursActivites - sum}h
                    </p>
                </Box>
            </Box>
            <Divider />
        </Box>
    )
}
