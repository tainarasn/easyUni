import React, { useEffect } from "react"
import { Box } from "@mui/material"
import { TitleUni } from "../../../../components/TitleUni"
import { colors } from "../../../../styles/colors"
import { Resume } from "../../../../components/Resume"
import { TextFieldUni } from "../../../../components/TextFieldUni"
import { ButtonUni } from "../../../../components/ButtonUni"
import { useUser } from "../../../../hooks/useUser"
import { useFormik } from "formik"
import { PartialUser, User } from "../../../../types/server/class/user"
import { api } from "../../../../api"
import { useSnackbar } from "burgos-snackbar"

interface AccountProps {
    user: User
}

export const Account: React.FC<AccountProps> = ({ user }) => {
    const { setUser } = useUser()
    const { snackbar } = useSnackbar()
    const formik = useFormik<PartialUser>({
        initialValues: {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
            image: user.image,
            password: user.password,
            isAdmin: user.isAdmin,
            student: user.student,
            admin: user.admin,
        },
        onSubmit: async (values) => {
            await handleUpdate(values)
        },
    })

    const handleUpdate = async (values: PartialUser) => {
        try {
            const response = await api.patch("/user/update", values)
            setUser(response.data)
            snackbar({ text: "Dados atualizados com sucesso!", severity: "success" })
            console.log(response)
        } catch (error) {
            snackbar({ text: "Algo deu errado! Tente novamente mais tarde.", severity: "error" })
            console.log(error)
        }
    }

    useEffect(() => {
        console.log({ USER: user })
    }, [user])
    return (
        <Box sx={{ width: 1, height: 1, flexDirection: "column", gap: "0.8vw" }}>
            <TitleUni title="Minha Conta" />
            <Box
                sx={{
                    width: "76vw",
                    height: 1,
                    flexDirection: "row",
                    gap: "0.8vw",
                    overflowX: "auto",
                    borderRadius: 0,
                    "&::-webkit-scrollbar": {
                        width: "0.3vw",
                        height: "0.3vw",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "#f1f1f1",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: colors.black3,
                        borderRadius: "0.25vw",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        background: "#555",
                    },
                }}
            >
                <Box
                    sx={{
                        width: "98%",
                        height: "100%",
                        borderRadius: "1vw",
                        pt: "0.2vw",
                        flexDirection: "column",
                        gap: "0.8vw",
                        pl: "0.5vw",
                    }}
                >
                    <form action="" onSubmit={formik.handleSubmit}>
                        <Box sx={{ width: 1, gap: "0.8vw" }}>
                            <TextFieldUni
                                sx={{ width: "100%" }}
                                name="name"
                                label="Nome Completo"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                        </Box>
                        <TextFieldUni
                            sx={{ width: "100%" }}
                            label="E-mail Institucional"
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            disabled
                        />
                        <Box sx={{ width: 1, gap: "0.8vw" }}>
                            <TextFieldUni
                                sx={{ width: "50%" }}
                                label="Nome de usuário"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                            />
                            <TextFieldUni
                                sx={{ width: "50%" }}
                                label="Senha"
                                name="password"
                                value={formik.values.password}
                                type="password"
                                onChange={formik.handleChange}
                            />
                        </Box>
                        <Box sx={{ width: 1, gap: "0.8vw" }}></Box>
                        <Box sx={{ width: 1, gap: "0.8vw" }}>
                            <ButtonUni
                                type="submit"
                                variant="contained"
                                size="small"
                                sx={{ width: 0.2, fontSize: "0.9rem", alignSelf: "flex-end" }}
                            >
                                Atualizar Dados
                            </ButtonUni>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box>
    )
}
