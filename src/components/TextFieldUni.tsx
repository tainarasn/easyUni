import React from "react"
import { TextField, TextFieldProps } from "@mui/material"

import { style_textfield } from "../styles/textField"
export const TextFieldUni: React.FC<TextFieldProps> = ({ children, ...props }) => {
    return (
        <TextField
            {...props}
            InputProps={{
                style: { borderRadius: "8px" },
            }}
            sx={{ ...style_textfield, ...props.sx }}
        />
    )
}
