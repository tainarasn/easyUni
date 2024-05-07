import { Box, CircularProgress } from "@mui/material"
import React, { useEffect, useState } from "react"
import { ButtonUni } from "./ButtonUni"
import { GrUpdate } from "react-icons/gr"

interface TitleUniProps {
    title: string
    button?: boolean
    click?: () => void
    loading?: boolean
}

export const TitleUni: React.FC<TitleUniProps> = ({ title, button, click, loading }) => {
    return (
        <Box sx={{ alginItems: "center", width: 1, gap: "1vw" }}>
            <h2 style={{}}>{title}</h2>
            {button && (
                <ButtonUni variant="contained" size="small" sx={{ fontSize: "0.9rem", gap: "0.5vw" }} onClick={click}>
                    {loading ? <CircularProgress sx={{ color: "#fff" }} size="1vw" /> : <GrUpdate />}
                    Gerar Ranking
                </ButtonUni>
            )}
        </Box>
    )
}
