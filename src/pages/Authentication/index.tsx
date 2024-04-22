import Skeleton from "@mui/material/Skeleton"
import Box from "@mui/material/Box"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import { AuthBox } from "../../components/AuthBox"

interface AuthProps {}

export const Auth: React.FC<AuthProps> = ({}) => {
    const navigate = useNavigate()
    return (
        <Box sx={{ height: "100%", width: "100%" }}>
            <Box sx={{ width: "100vw", height: "100%", gap: "0.8vw", justifyContent: "center", alignItems: "center" }}>
                <AuthBox />
            </Box>
        </Box>
    )
}
