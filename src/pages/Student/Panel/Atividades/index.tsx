import React from "react"
import { Box } from "@mui/material"
import { TitleUni } from "../../../../components/TitleUni"
import { colors } from "../../../../styles/colors"
import { CrudAtividade } from "../../../../components/Atividades/CrudAtividade"
import AtividadeCrudGrid from "../../../../components/Atividades/AtividadeCrudGrid"

interface AtividadesProps {}

export const Atividades: React.FC<AtividadesProps> = ({}) => {
    return (
        <Box sx={{ width: 1, height: 1, flexDirection: "column", gap: "0.8vw" }}>
            <TitleUni title="Atividades Complementares" />
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
                    }}
                >
                    <AtividadeCrudGrid />
                </Box>
                <CrudAtividade />
            </Box>
        </Box>
    )
}
