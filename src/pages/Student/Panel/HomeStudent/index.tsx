import React from "react"
import { Box, Chip, Grid } from "@mui/material"
import { TitleUni } from "../../../../components/TitleUni"
import { useArray } from "burgos-array"
import { colors } from "../../../../styles/colors"
import { Resume } from "../../../../components/Resume"

interface HomeStudentProps {}

export const HomeStudent: React.FC<HomeStudentProps> = ({}) => {
    const materias = useArray().newArray(6)
    const materiasEngComp = [
        "Cálculo I",
        "Robótica I",
        "Álgebra Linear",
        "Introdução à Programação",
        "Circuitos Digitais",
        "Robótica II",
    ]
    return (
        <Box sx={{ width: 1, height: 1, flexDirection: "column", gap: "0.8vw" }}>
            <TitleUni title="Resumo" />
            <Grid container spacing={1}>
                {materiasEngComp.map((item, index) => (
                    <Grid item xs={1.5} key={index}>
                        <Chip
                            sx={{
                                width: 1,
                                bgcolor: colors.yellow,
                            }}
                            label={item}
                        />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ width: 1, height: 1, flexDirection: "row", gap: "1vw" }}>
                <Box
                    sx={{
                        width: 0.5,
                        flexGrow: 1,
                        height: 1,
                        gap: "1vw",
                        flexDirection: "column",
                        borderRadius: 0,
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{
                            width: 1,
                            height: 1,
                            flexDirection: "row",
                            borderRadius: "1vw",
                            gap: "1vw",
                        }}
                    >
                        <Box
                            sx={{
                                width: 0.7,
                                height: 1,
                                flexDirection: "column",
                                borderRadius: "1vw",
                                bgcolor: "#EBEBEB",
                                p: "1vw",
                            }}
                        >
                            <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>Engenharia da Computação</p>
                        </Box>
                        <Box
                            sx={{
                                width: 0.3,
                                height: 1,
                                flexDirection: "column",
                                borderRadius: "1vw",
                                bgcolor: "#EBEBEB",
                                p: "1vw",
                            }}
                        >
                            <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>To do List</p>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            width: 1,
                            height: 0.6,
                            flexDirection: "column",
                            borderRadius: 0,
                            gap: "1vw",
                        }}
                    >
                        {" "}
                        <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>Atividades Complementares</p>
                        <Grid container spacing={2}>
                            {materiasEngComp.map((materia, index) => (
                                <Grid item xs={4} key={index}>
                                    <Box
                                        sx={{
                                            width: 1,
                                            height: "8vw",
                                            borderRadius: "1vw",
                                            p: "1vw",

                                            boxShadow:
                                                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                                        }}
                                    >
                                        {materia}
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
                <Resume />
            </Box>
        </Box>
    )
}
