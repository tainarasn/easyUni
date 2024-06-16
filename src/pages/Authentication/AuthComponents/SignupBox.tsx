import React, { useEffect, useState } from "react"
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useNavigate } from "react-router-dom"
import utfpr from "../../../assets/logos/utfpr-universidade-tecnologica-federal-do-parana-logo-6CF2B55F31-seeklogo.com.png"
import { TextFieldUni } from "../../../components/TextFieldUni"
import { colors } from "../../../styles/colors"
import { ButtonUni } from "../../../components/ButtonUni"
import { api } from "../../../api"
import { useFormik } from "formik"
import { useSnackbar } from "burgos-snackbar"
import { User, UserForm } from "../../../types/server/class/user"
import { Course } from "../../../types/server/class/course"
import { useUser } from "../../../hooks/useUser"

interface SignupBoxProps {
    isFlipped: boolean
    setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>
}

export const SignupBox: React.FC<SignupBoxProps> = ({ isFlipped, setIsFlipped }) => {
    const { snackbar } = useSnackbar()
    const { user, setUser } = useUser()
    const navigate = useNavigate()
    const [listCourses, setListCourses] = useState<Course[]>([])

    const formik = useFormik<UserForm>({
        initialValues: {
            name: "",
            image: "",
            username: "",
            email: "",
            password: "",
            isAdmin: false,
            student: {
                period: 5,
                courseId: null,
            },
            admin: null,
        },
        onSubmit: async (values, { resetForm }) => {
            console.log(values)
            await signup(values)
            resetForm()
        },
    })

    const signup = async (values: UserForm) => {
        const data = {
            ...values,
            student: { ...values.student, period: Number(values.student.period) }, // Certifique-se de que `values.student.period` seja convertido corretamente para número aqui
        }
        try {
            const response = await api.post("/signup", data)
            snackbar({ text: "Cadastro realizado com sucesso!", severity: "success" })
            console.log(response)

            const login = await api.post("/login", { code: values.username, password: values.password })
            setUser(login.data)
            console.log(login)
            snackbar({ text: "Logado com sucesso!", severity: "success" })

            if (login.data.isAdmin) {
                navigate("/admin")
            } else {
                navigate("/student")
            }
        } catch (error) {
            console.log(error)
            snackbar({ text: "Algo deu errado! Tente novamente.", severity: "error" })
        }
    }

    const fetchCourses = async () => {
        try {
            const response = await api.get("/course/all")
            setListCourses(response.data)
        } catch (error) {
            console.log(error)
            snackbar({ text: "Algo deu errado! Recarregue a página.", severity: "error" })
        }
    }

    useEffect(() => {
        fetchCourses()
        console.log(listCourses)
    }, [])

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
                    <FormControl fullWidth>
                        <InputLabel id="campus-select-label">Curso</InputLabel>
                        <Select
                            labelId="campus-select-label"
                            id="campus-select"
                            value={formik?.values.student.courseId}
                            onChange={(event) => {
                                //@ts-ignore
                                formik.setFieldValue("student.courseId", event.target.value)
                            }}
                            label="Curso"
                            sx={{ borderRadius: "1vw" }}
                        >
                            <MenuItem value="">Selecionar Curso</MenuItem>
                            {listCourses.map((course) => (
                                //@ts-ignore
                                <MenuItem key={course.id} value={course.id}>
                                    {course.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextFieldUni
                        sx={{ width: 1 }}
                        label="Período"
                        name="student.period"
                        type="number"
                        value={formik.values.student.period}
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
