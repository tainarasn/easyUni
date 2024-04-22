import React from "react"
import { Box } from "@mui/material"
import { Routes as ReactRoutes, Route } from "react-router-dom"
import { PanelStudent } from "./Panel"
import { Menu } from "../../components/Menu"
import { HeaderUni } from "../../components/HeaderUni"

interface StudentProps {
    // user: User
}

export const Student: React.FC<StudentProps> = ({}) => {
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
                    }}
                >
                    <HeaderUni />
                    <ReactRoutes>
                        <Route index element={<PanelStudent />} />
                        <Route path="/" element={<PanelStudent />} />
                    </ReactRoutes>
                </Box>
            </Box>
        </Box>
    )
}
