import React from "react"
import { Box } from "@mui/material"

interface TitleUniProps {
    title: string
}

export const TitleUni: React.FC<TitleUniProps> = ({ title }) => {
    return <h2 style={{}}>{title}</h2>
}
