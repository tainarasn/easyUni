import React, { useState } from "react"
import Logo from "../../../assets/logos/logo_completa (1).png"
import { Box } from "@mui/material"
import { LoginBox } from "./LoginBox"
import { SignupBox } from "./SignupBox"

const containerStyle = {
    perspective: "1000px",
    height: "70vh", // Definindo a altura da caixa principal
    flexDirection: "column",
    alignItems: "center",
}

const cardStyle = {
    width: "30vw",
    height: "100%", // Alterando a altura da caixa principal para 100%
    bgcolor: "#fff",
    p: "2vw",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    position: "relative",
    transition: "transform 0.8s",
    transformStyle: "preserve-3d",
}

const cardFaceStyle = {
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    display: "flex",
}

const frontStyle = {
    ...cardFaceStyle,
}

const backStyle = {
    ...cardFaceStyle,
    transform: "rotateY(180deg)",
}

export const AuthBox: React.FC = () => {
    const [isFlipped, setIsFlipped] = useState(false)

    return (
        <Box sx={containerStyle}>
            <img src={Logo} style={{ width: "12vw" }} />
            <Box sx={{ ...cardStyle, transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
                <Box sx={isFlipped ? backStyle : frontStyle}>
                    {isFlipped ? (
                        <SignupBox isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
                    ) : (
                        <LoginBox isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
                    )}
                </Box>
            </Box>
        </Box>
    )
}
