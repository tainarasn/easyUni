import React from "react"
import { Box, Divider } from "@mui/material"

interface ResumeProps {}

export const Resume: React.FC<ResumeProps> = ({}) => {
    return (
        <Box
            sx={{
                width: "30%",
                height: 1,
                bgcolor: "#EBEBEB",
                borderRadius: "1vw",
                p: "2vw",
                flexDirection: "column",
                gap: "1vw",
            }}
        >
            <p style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Resumo do Curso</p>
            <Box sx={{ flexDirection: "column" }}>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Período:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>6º</p>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Curso:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Engenharia da Computação</p>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Campus:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Curitiba</p>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Sede:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Centro</p>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Matriz:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>844</p>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Trilhas:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>270h</p>
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
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>3460h</p>
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
