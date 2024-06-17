import React, { useState } from "react"
import { Box, Chip, IconButton, Tooltip } from "@mui/material"
import { Materia } from "../../types/server/class/materia"
import { colors } from "../../styles/colors"
import { ModalMateria } from "../Materias/ModalMateria"
import { CiEdit } from "react-icons/ci"
import { FaRegEye } from "react-icons/fa"
import { Activity } from "../../types/server/class/activity"

interface ActivityCardProps {
    home?: boolean
    activity: Activity
    setOpenUpdate?: React.Dispatch<React.SetStateAction<boolean>>
    setActiviy?: React.Dispatch<React.SetStateAction<Activity | null>>
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, setOpenUpdate, setActiviy, home }) => {
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
                    width: "1vw",
                    borderRadius: "0.5vw 0 0 0.5vw",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                }}
            ></Box>
            <Box sx={{ p: "0.85vw", width: 1, justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ flexDirection: "column" }}>
                    <p
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setOpen(true)
                            setActiviy && setActiviy(activity)
                        }}
                    >
                        {activity.name}
                    </p>
                    <p style={{ fontSize: "0.8rem", fontWeight: "600" }}>
                        {activity.student.course && activity.student.course.name}
                    </p>
                </Box>
                {!home && (
                    <Box sx={{ gap: "0.5vw" }}>
                        <IconButton
                            onClick={() => {
                                setActiviy && setActiviy(activity)
                                setOpenUpdate && setOpenUpdate(true)
                            }}
                        >
                            <CiEdit />
                        </IconButton>
                    </Box>
                )}
            </Box>
        </Box>
    )
}
