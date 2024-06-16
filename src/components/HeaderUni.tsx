import React from "react"
import { Avatar, Box } from "@mui/material"
import { TextFieldUni } from "./TextFieldUni"
import { colors } from "../styles/colors"
import { useUser } from "../hooks/useUser"
import { useNavigate } from "react-router-dom"
import { User } from "../types/server/class/user"

interface HeaderUniProps {
    user: User
}

export const HeaderUni: React.FC<HeaderUniProps> = ({ user }) => {
    const navigate = useNavigate()
    return (
        <Box sx={{ width: 1, height: "6vh", gap: "1vw", borderRadius: "1vw", justifyContent: "space-between" }}>
            <TextFieldUni sx={{ width: 1 }} value={"Buscar"} />
            <Box
                sx={{
                    width: 0.2,
                    borderRadius: "1vw",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box sx={{ width: 0.7, flexDirection: "column" }}>
                    <p
                        style={{
                            color: colors.black3,
                            width: "6.5vw",

                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textAlign: "end",
                        }}
                    >
                        {user?.name}
                    </p>
                    <p style={{ width: "6.5vw", color: colors.black3, textAlign: "end" }}>
                        {user?.isAdmin ? "Administração" : user?.student?.period + "° período"}
                    </p>
                </Box>
                <Avatar
                    sx={{ width: "2.5vw", height: "2.5vw" }}
                    onClick={() => {
                        if (user?.isAdmin) {
                            navigate("/admin/account")
                        } else {
                            navigate("/student/account")
                        }
                    }}
                />
            </Box>
        </Box>
    )
}
