import React from "react"
import { Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import utfpr from "../../assets/logos/utfpr-universidade-tecnologica-federal-do-parana-logo-6CF2B55F31-seeklogo.com.png"
import { TextFieldUni } from "../TextFieldUni"
import { colors } from "../../styles/colors"
import { ButtonUni } from "../ButtonUni"

interface LoginBoxProps {
    isFlipped: boolean
    setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoginBox: React.FC<LoginBoxProps> = ({ isFlipped, setIsFlipped }) => {
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 1,
                height: 1,
                gap: "3vw",
            }}
        >
            <img src={utfpr} style={{ width: "8vw" }} />
            <Box
                sx={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 1,
                    gap: "0.5vw",
                }}
            >
                <TextFieldUni sx={{ width: 1 }} label="Nome de usuário ou e-mail" value="" onChange={() => {}} />
                <TextFieldUni sx={{ width: 1 }} label="Senha" type="password" value="" onChange={() => {}} />
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
                    Não possui cadastro? Clique aqui.
                </p>
            </Box>
            <ButtonUni
                size="large"
                onClick={() => {
                    navigate("/student")
                }}
            >
                Entrar
            </ButtonUni>
        </Box>
    )
}