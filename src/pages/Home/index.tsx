import Box from "@mui/material/Box"
import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
    const navigate = useNavigate()
    return (
        <Box sx={{ height: "100%", width: "100%" }}>
            <Box sx={{ width: "100vw", height: "100%", gap: "0.8vw", justifyContent: "center", alignItems: "center" }}>
                <Button variant="contained" onClick={() => navigate("/auth")}>
                    Login
                </Button>
            </Box>
        </Box>
    )
}
