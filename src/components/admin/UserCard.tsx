import React, { useState } from "react"
import { Box, Chip } from "@mui/material"
import { colors } from "../../styles/colors"
import { User } from "../../types/server/class/user"

interface UserCardProps {
    user: User
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
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
                {user.student?.period}°
            </Box>
            <Box sx={{ p: "0.65vw", width: 1, justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ flexDirection: "column" }}>
                    <p style={{ cursor: "pointer" }}>{user.name}</p>
                </Box>
                <Box sx={{ gap: "0.5vw" }}>
                    <Chip label={user.student?.course.name} sx={{ bgcolor: colors.yellow, fontSize: "0.9rem" }} />
                </Box>
            </Box>
        </Box>
    )
}
