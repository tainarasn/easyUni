import React, { useEffect, useState } from "react"
import { Box, IconButton } from "@mui/material"
import { Menu } from "../../../components/Menu"
import { HeaderUni } from "../../../components/HeaderUni"
import { BiSupport } from "react-icons/bi"
import { ModalSupport } from "../../../components/Support/ModalSupport"
import { colors } from "../../../styles/colors"
import { HomeStudent } from "../../Student/Panel/HomeStudent"
import { useUser } from "../../../hooks/useUser"
import { Materias } from "./Materias"
import { Courses } from "./Courses"
import { Students } from "./Students"
import { User } from "../../../types/server/class/user"
import { Account } from "./Account"

interface PanelAdminProps {
    location: string
    user?: User
}

export const PanelAdmin: React.FC<PanelAdminProps> = ({ location, user }) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    useEffect(() => {
        console.log({ USER: user })
    }, [user])

    return (
        <Box sx={{ width: 1, height: 1, alignItems: "center", justifyContent: "center", p: "2vw" }}>
            <Box
                sx={{
                    width: 1,
                    height: 1,
                    bgcolor: "#fff",
                    borderRadius: "1vw",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
            >
                {user && <Menu user={user} />}
                <Box
                    sx={{
                        width: 0.9,
                        height: 1,
                        borderRadius: "1vw",
                        padding: "2vw",
                        flexDirection: "column",
                        gap: "1vw",
                        color: colors.black3,
                    }}
                >
                    {user && <HeaderUni user={user} />}
                    <Box
                        sx={{
                            width: 1,
                            height: 1,
                            borderRadius: "1vw",

                            flexDirection: "column",
                        }}
                    >
                        {location == "init" ? (
                            <HomeStudent />
                        ) : location == "materias" ? (
                            <Materias />
                        ) : location == "courses" ? (
                            <Courses />
                        ) : location == "students" ? (
                            <Students />
                        ) : (
                            location == "account" && user && <Account user={user} />
                        )}

                        <IconButton
                            sx={{ bgcolor: colors.black3, position: "fixed", bottom: "4vw", right: "4vw", p: "1vw" }}
                            onClick={handleOpen}
                        >
                            <BiSupport color="#fff" size="1.5vw" />
                        </IconButton>
                        <ModalSupport open={open} setOpen={setOpen} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
