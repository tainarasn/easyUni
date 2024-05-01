import React from "react"
import { Box, Divider } from "@mui/material"

interface CrudAtividadeProps {}

export const CrudAtividade: React.FC<CrudAtividadeProps> = ({}) => {
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
            <p style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Resumo das Atividades</p>
            <Box sx={{ flexDirection: "column" }}>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Campus:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Curitiba</p>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Curso:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Engenharia da Computação</p>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Matriz:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>844</p>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Total de Horas:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>3460h</p>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Trilhas:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>270h</p>
                </Box>
            </Box>
            <Divider />
            <Box sx={{ flexDirection: "column" }}>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Atividades Complementares:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>180h</p>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Social:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>20h</p>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Cultural:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>40h</p>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem" }}>Técnico-Científico:</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>80h</p>
                </Box>
            </Box>
            <Divider />
            <Box sx={{ flexDirection: "column" }}>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Realizadas :</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>140h</p>
                </Box>
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Faltantes :</p>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>40h</p>
                </Box>
            </Box>
        </Box>
    )
}
