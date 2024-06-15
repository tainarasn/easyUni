import React, { useEffect } from "react"
import { Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import utfpr from "../../../assets/logos/utfpr-universidade-tecnologica-federal-do-parana-logo-6CF2B55F31-seeklogo.com.png"
import { TextFieldUni } from "../../../components/TextFieldUni"
import { colors } from "../../../styles/colors"
import { ButtonUni } from "../../../components/ButtonUni"
import { useFormik } from "formik"
import { api } from "../../../api"
import { LoginForm } from "../../../types/shared/login"
import { useUser } from "../../../hooks/useUser"
import { User } from "../../../types/server/class/user"

interface LoginBoxProps {
    isFlipped: boolean
    setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoginBox: React.FC<LoginBoxProps> = ({ isFlipped, setIsFlipped }) => {
    const navigate = useNavigate()
    const { user, setUser } = useUser()
    const formik = useFormik<LoginForm>({
        initialValues: {
            code: "",
            password: "",
        },
        onSubmit: (values) => {
            login(values)
        },
    })

    const login = async (values: LoginForm) => {
        try {
            const response = await api.post("/login", values)
            setUser(response.data)
            console.log(response)
            navigate("/admin")
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        console.log(user)
    }, [user])
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
                        label="Nome de usuário ou e-mail"
                        name="code"
                        value={formik.values.code}
                        onChange={formik.handleChange}
                    />
                    <TextFieldUni
                        sx={{ width: 1 }}
                        label="Senha"
                        type="password"
                        name="password"
                        value={formik.values.password}
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
                        Não possui cadastro? Clique aqui.
                    </p>
                </Box>
                <ButtonUni size="large" type="submit">
                    Entrar
                </ButtonUni>
            </form>
        </Box>
    )
}
