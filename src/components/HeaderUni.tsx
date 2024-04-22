import React from "react"
import { Avatar, Box } from "@mui/material"
import { TextFieldUni } from "./TextFieldUni"
import { colors } from "../styles/colors"

interface HeaderUniProps {}

export const HeaderUni: React.FC<HeaderUniProps> = ({}) => {
    return (
        <Box sx={{ width: 1, height: "6vh", gap: "1vw", borderRadius: "1vw", justifyContent: "space-between" }}>
            <TextFieldUni sx={{ width: 0.9 }} />
            <Box
                sx={{
                    width: 0.2,
                    gap: "1vw",
                    // boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                    borderRadius: "1vw",
                    alignItems: "center",
                    justifyContent: "center",
                    // p: "1vw",
                }}
            >
                <Box sx={{ flexDirection: "column", alignItems: "end" }}>
                    <p style={{ color: colors.black3 }}>[Nome do Estudante]</p>
                    <p style={{ color: colors.black3 }}>[período]</p>
                </Box>
                <Avatar sx={{ width: "2.5vw", height: "2.5vw" }} />
            </Box>
        </Box>
    )
}
