import React from "react"
import { Box } from "@mui/material"
import { TitleUni } from "../../../../components/TitleUni"

interface RankingProps {}

export const Ranking: React.FC<RankingProps> = ({}) => {
    return (
        <Box sx={{}}>
            <TitleUni title="Gerar Recomendação" />
        </Box>
    )
}
