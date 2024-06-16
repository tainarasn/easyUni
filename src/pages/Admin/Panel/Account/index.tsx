import React from "react"
import { Box } from "@mui/material"
import { TitleUni } from "../../../../components/TitleUni"
import { colors } from "../../../../styles/colors"
import { Resume } from "../../../../components/Resume"
import { TextFieldUni } from "../../../../components/TextFieldUni"
import { ButtonUni } from "../../../../components/ButtonUni"
import { User } from "../../../../types/server/class/user"

interface AccountProps {
    user: User
}

export const Account: React.FC<AccountProps> = ({ user }) => {
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
                        width: "75%",
                        height: "100%",
                        borderRadius: "1vw",
                        pt: "0.2vw",
                        flexDirection: "column",
                        gap: "0.8vw",
                        pl: "0.5vw",
                    }}
                >
                    <Box sx={{ width: 1, gap: "0.8vw" }}>
                        <TextFieldUni sx={{ width: "70%" }} label="Nome Completo" />
                        <TextFieldUni sx={{ width: "30%" }} label="Data de Nascimento" placeholder="dd/mm/aaaa" />
                    </Box>
                    <TextFieldUni sx={{ width: "100%" }} label="E-mail Institucional" />
                    <Box sx={{ width: 1, gap: "0.8vw" }}>
                        <TextFieldUni sx={{ width: "50%" }} label="Nome de usuário" type="email" />
                        <TextFieldUni sx={{ width: "50%" }} label="Senha" type="password" />
                    </Box>
                    <Box sx={{ width: 1, gap: "0.8vw" }}>
                        <TextFieldUni sx={{ width: "50%" }} label="Curso" type="email" />
                        <TextFieldUni sx={{ width: "50%" }} label="Período" />
                    </Box>
                    <Box sx={{ width: 1, gap: "0.8vw" }}>
                        <ButtonUni
                            variant="contained"
                            size="small"
                            sx={{ width: 0.2, fontSize: "0.9rem", alignSelf: "flex-end" }}
                        >
                            Atualizar Dados
                        </ButtonUni>
                    </Box>
                </Box>
                <Resume />
            </Box>
        </Box>
    )
}
