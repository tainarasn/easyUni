import React, { useState } from "react"
import { Box, IconButton } from "@mui/material"
import { Menu } from "../../../components/Menu"
import { HeaderUni } from "../../../components/HeaderUni"
import { BiSupport } from "react-icons/bi"
import { ModalSupport } from "../../../components/Support/ModalSupport"
import { colors } from "../../../styles/colors"

interface PanelAdminProps {
    location: string
}

export const PanelAdmin: React.FC<PanelAdminProps> = ({ location }) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
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
                <Menu />
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
                    <HeaderUni />
                    <Box
                        sx={{
                            width: 1,
                            height: 1,
                            borderRadius: "1vw",

                            flexDirection: "column",
                        }}
                    >
                        {/* {location == "init" ? (
                            <HomeStudent />
                        ) : location == "materias" ? (
                            <Materias />
                        ) : location == "ranking" ? (
                            <Ranking />
                        ) : location == "account" ? (
                            <Account />
                        ) : (
                            location == "atividades" && <Atividades />
                        )} */}
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
