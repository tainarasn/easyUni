import React from "react"
import { Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import utfpr from "../assets/logos/utfpr-universidade-tecnologica-federal-do-parana-logo-6CF2B55F31-seeklogo.com.png"
import { TextFieldUni } from "./TextFieldUni"
import { colors } from "../styles/colors"
import { ButtonUni } from "./ButtonUni"
import { HiOutlineMail } from "react-icons/hi"

interface SignupBoxProps {
    isFlipped: boolean
    setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>
}

export const SignupBox: React.FC<SignupBoxProps> = ({ isFlipped, setIsFlipped }) => {
    const navigate = useNavigate()
    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 1,
                height: 1,
                gap: "2vw",
            }}
        >
            <img src={utfpr} style={{ width: "6vw" }} />
            <h2 style={{ color: colors.black3 }}>Cadastre-se</h2>
            <Box
                sx={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 1,
                    gap: "0.5vw",
                }}
            >
                <TextFieldUni sx={{ width: 1 }} label="Nome Completo" value="" onChange={() => {}} />
                <TextFieldUni sx={{ width: 1 }} label="E-mail" type="email" value="" onChange={() => {}} />
                <Box sx={{ width: 1, gap: "0.5vw" }}>
                    <TextFieldUni sx={{ width: 1 }} label="Nome de usuário" type="password" value="" onChange={() => {}} />
                    <TextFieldUni sx={{ width: 1 }} label="Senha" type="password" value="" onChange={() => {}} />
                </Box>
                <TextFieldUni sx={{ width: 1 }} label="Período" value="" onChange={() => {}} />
                <p
                    style={{
                        color: colors.black3,
                        width: "100%",
                        textAlign: "end",
                        fontSize: "0.9rem",
                        textDecoration: "underline",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        setIsFlipped(!isFlipped)
                    }}
                >
                    Já possui conta? Faça login aqui.
                </p>
            </Box>
            <ButtonUni
                size="large"
                onClick={() => {
                    navigate("/student")
                }}
            >
                Cadastrar
            </ButtonUni>
        </Box>
    )
}
