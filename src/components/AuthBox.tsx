import React, { useState } from "react"

import { Box } from "@mui/material"
import { LoginBox } from "./LoginBox"
import { SignupBox } from "./SignupBox"

const containerStyle = {
    perspective: "1000px",
    height: "63vh", // Definindo a altura da caixa principal
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
    cursor: "pointer",
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

    const handleClick = () => {
        setIsFlipped(!isFlipped)
    }

    return (
        <Box sx={containerStyle} onClick={handleClick}>
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
