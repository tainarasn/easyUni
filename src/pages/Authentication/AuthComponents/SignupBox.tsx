import React, { useEffect } from "react"
import { Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import utfpr from "../../../assets/logos/utfpr-universidade-tecnologica-federal-do-parana-logo-6CF2B55F31-seeklogo.com.png"
import { TextFieldUni } from "../../../components/TextFieldUni"
import { colors } from "../../../styles/colors"
import { ButtonUni } from "../../../components/ButtonUni"
import { api } from "../../../api"
import { useFormik } from "formik"

interface SignupBoxProps {
    isFlipped: boolean
    setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>
}

export const SignupBox: React.FC<SignupBoxProps> = ({ isFlipped, setIsFlipped }) => {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            name: "",
            image: "",
            username: "",
            email: "",
            password: "",
            isAdmin: true,
            student: null,
            admin: null,
        },
        onSubmit: (values) => {
            console.log(values)
            signup(values)
        },
    })

    const signup = async (values: any) => {
        try {
            const response = await api.post("/signup", values)
            console.log(response)
            navigate("/student")
        } catch (error) {
            console.log(error)
        }
    }

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
            <form action="" onSubmit={formik.handleSubmit}>
                <Box
                    sx={{
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 1,
                        gap: "0.5vw",
                    }}
                >
                    <TextFieldUni
                        sx={{ width: 1 }}
                        label="Nome Completo"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    <TextFieldUni
                        sx={{ width: 1 }}
                        label="E-mail"
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    <Box sx={{ width: 1, gap: "0.5vw" }}>
                        <TextFieldUni
                            sx={{ width: 1 }}
                            label="Nome de usuário"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                        />
                        <TextFieldUni
                            sx={{ width: 1 }}
                            label="Senha"
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                    </Box>
                    <TextFieldUni
                        sx={{ width: 1 }}
                        label="Período"
                        name="period"
                        // value={formik.values.period}
                        onChange={formik.handleChange}
                    />
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
                <ButtonUni type="submit" size="large">
                    Cadastrar
                </ButtonUni>
            </form>
        </Box>
    )
}
