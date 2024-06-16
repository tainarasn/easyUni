import React, { useState } from "react"
import { Box, Chip, IconButton, Tooltip } from "@mui/material"
import { Materia } from "../../types/server/class/materia"
import { colors } from "../../styles/colors"
import { ModalMateria } from "../Materias/ModalMateria"
import { CiEdit } from "react-icons/ci"
import { FaRegEye } from "react-icons/fa"

interface MateriaCardProps {
    materia: Materia
    setOpenUpdate: React.Dispatch<React.SetStateAction<boolean>>
    setMateria: React.Dispatch<React.SetStateAction<Materia | null>>
}

export const MateriaCard: React.FC<MateriaCardProps> = ({ materia, setOpenUpdate, setMateria }) => {
    const [open, setOpen] = useState(false)

    return (
        <Box
            sx={{
                width: 1,
                // p: "0.85vw",
                borderRadius: "0.5vw",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",

                boxShadow: "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
            }}
            onClick={() => {
                // setOpen(true)
            }}
        >
            <Box
                sx={{
                    bgcolor: colors.yellow,
                    fontWeight: "Bold",
                    height: 1,
                    width: "2vw",
                    borderRadius: "0.5vw 0 0 0.5vw",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                }}
            >
                {materia.period}°
            </Box>
            <Box sx={{ p: "0.85vw", width: 1, justifyContent: "space-between", alignItems: "center" }}>
                <p
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        setOpen(true)
                        setMateria(materia)
                    }}
                >
                    {materia.name}
                </p>
                <Box sx={{ gap: "0.5vw" }}>
                    {materia.prerequisites.map((item) => (
                        <Tooltip
                            title={item.name}
                            children={
                                <Chip
                                    label={item.code}
                                    sx={{ bgcolor: colors.terciary, fontSize: "0.9rem", cursor: "pointer" }}
                                />
                            }
                        />
                    ))}
                    <Chip label={materia.code} sx={{ bgcolor: colors.yellow, fontSize: "0.9rem" }} />
                    <IconButton
                        onClick={() => {
                            setMateria(materia)
                            setOpenUpdate(true)
                        }}
                    >
                        <CiEdit />
                    </IconButton>
                </Box>
            </Box>
            <ModalMateria materia={materia} open={open} setOpen={setOpen} />
        </Box>
    )
}
