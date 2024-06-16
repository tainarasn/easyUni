import React, { useState } from "react"
import { Box, Chip, IconButton, Tooltip } from "@mui/material"
import { Materia } from "../../types/server/class/materia"
import { colors } from "../../styles/colors"
import { ModalMateria } from "../Materias/ModalMateria"
import { CiEdit } from "react-icons/ci"
import { FaRegEye } from "react-icons/fa"
import { Trail } from "../../types/server/class/trail"

interface TrailCardProps {
    trail: Trail
    setOpenUpdate: React.Dispatch<React.SetStateAction<boolean>>
    setTrail: React.Dispatch<React.SetStateAction<Trail | null>>
}

export const TrailCard: React.FC<TrailCardProps> = ({ trail, setOpenUpdate, setTrail }) => {
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
                {/* {trail.period}° */}
            </Box>
            <Box sx={{ p: "0.85vw", width: 1, justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ flexDirection: "column" }}>
                    <p
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setOpen(true)
                            setTrail(trail)
                        }}
                    >
                        {trail?.name}
                    </p>
                    {/* <p style={{ fontSize: "0.8rem", fontWeight: "600" }}>{trail.course && trail.course.name}</p> */}
                </Box>
                <Box sx={{ gap: "0.5vw" }}>
                    {/* {trail.prerequisites.map((item) => (
                        <Tooltip
                            title={item.name}
                            children={
                                <Chip
                                    label={item.code}
                                    sx={{ bgcolor: colors.terciary, fontSize: "0.9rem", cursor: "pointer" }}
                                />
                            }
                        />
                    ))} */}
                    <Chip label={trail?.course.name} sx={{ bgcolor: colors.yellow, fontSize: "0.9rem" }} />
                    <IconButton
                        onClick={() => {
                            setTrail(trail)
                            setOpenUpdate(true)
                        }}
                    >
                        <CiEdit />
                    </IconButton>
                </Box>
            </Box>
            {/* <ModalMateria materia={materia} open={open} setOpen={setOpen} /> */}
        </Box>
    )
}
