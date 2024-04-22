import React from "react"
import { Button, ButtonProps, SxProps } from "@mui/material"
import { colors } from "../styles/colors"

export const ButtonUni: React.FC<ButtonProps> = ({ children, ...props }) => {
    const button_style: SxProps = {
        bgcolor: colors.black3,
        fontFamily: "Lato",
        borderRadius: "0.5vw", // Adicionando border radius,
        textTransform: "inherit",
        fontSize: "1.2rem",
    }

    return (
        <Button variant="contained" {...props} sx={{ ...button_style, ...props.sx }}>
            {children}
        </Button>
    )
}
