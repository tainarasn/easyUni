import React from "react"
import { Box, IconButton } from "@mui/material"
import { ModalMateria } from "./ModalMateria"
import { IoEyeOutline } from "react-icons/io5"

interface MateriaBoxProps {
    materia: any
}

export const MateriaBox: React.FC<MateriaBoxProps> = ({ materia }) => {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)

    return (
        <Box
            sx={{
                width: "12vw",
                height: "fit-content",
                p: "1vw",
                borderRadius: "1vw",
                border: "1px solid black",
                flexDirection: "column",
            }}
        >
            <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "bold" }}>{materia.code}</p>
                <IconButton onClick={handleOpen} sx={{ "&:focus": { outline: "none" } }}>
                    <IoEyeOutline size={"1vw"} />
                </IconButton>
            </Box>

            <p
                style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    fontSize: "0.8rem",
                }}
            >
                {materia.name}
            </p>
            <ModalMateria materia={materia} open={open} setOpen={setOpen} />
        </Box>
    )
}
