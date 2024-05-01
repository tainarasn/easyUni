import Box from "@mui/material/Box"
import React from "react"
import { AuthBox } from "../../components/AuthComponents/AuthBox"

interface AuthProps {}

export const Auth: React.FC<AuthProps> = ({}) => {
    return (
        <Box sx={{ height: "100%", width: "100%" }}>
            <Box sx={{ width: "100vw", height: "100%", gap: "0.8vw", justifyContent: "center", alignItems: "center" }}>
                <AuthBox />
            </Box>
        </Box>
    )
}
