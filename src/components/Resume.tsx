import React from "react"
import { Box, Divider } from "@mui/material"
import { User } from "../types/server/class/user"

interface ResumeProps {
    user?: User
}

export const Resume: React.FC<ResumeProps> = ({ user }) => {
    return (
        <Box
            sx={{
                width: "30%",
                height: 1,
                bgcolor: "#EBEBEB",
                borderRadius: "1vw",
                p: "1.5vw",
                flexDirection: "column",
                gap: "1vw",
            }}
        >
            <p style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Resumo do Curso</p>
            <Box sx={{ flexDirection: "column" }}>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Período:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{user?.student?.period}°</p>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Curso:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Engenharia da Computação</p>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Campus:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{user?.student?.course.campus}</p>
                </Box>

                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Matriz:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{user?.student?.course.matriz}</p>
                </Box>

                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Atividades Complementares:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>180h</p>
                </Box>
            </Box>
            <Divider />
            <Box sx={{ flexDirection: "column" }}>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Total de Horas:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{user?.student?.course.totalHours}h</p>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Horas Cursadas :</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>1450h</p>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Horas Faltantes :</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>2010h</p>
                </Box>
            </Box>
        </Box>
    )
}
