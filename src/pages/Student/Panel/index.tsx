import React from "react"
import { Box } from "@mui/material"
import { Menu } from "../../../components/Menu"
import { HeaderUni } from "../../../components/HeaderUni"
import { HomeStudent } from "./HomeStudent"
import { Materias } from "./Materias"
import { Ranking } from "./Ranking"
import { Atividades } from "./Atividades"
import { colors } from "../../../styles/colors"

interface PanelStudentProps {
    location: string
}

export const PanelStudent: React.FC<PanelStudentProps> = ({ location }) => {
    return (
        <Box sx={{ width: 1, height: 1, alignItems: "center", justifyContent: "center", p: "2vw" }}>
            <Box
                sx={{
                    width: 1,
                    height: 1,
                    bgcolor: "#fff",
                    borderRadius: "1vw",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
            >
                <Menu />
                <Box
                    sx={{
                        width: 1,
                        height: 1,
                        borderRadius: "1vw",
                        padding: "2vw",
                        flexDirection: "column",
                        gap: "1vw",
                        color: colors.black3,
                    }}
                >
                    <HeaderUni />
                    <Box
                        sx={{
                            width: 1,
                            height: 1,
                            borderRadius: "1vw",

                            flexDirection: "column",
                        }}
                    >
                        {location == "init" ? (
                            <HomeStudent />
                        ) : location == "materias" ? (
                            <Materias />
                        ) : location == "ranking" ? (
                            <Ranking />
                        ) : (
                            location == "atividades" && <Atividades />
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
