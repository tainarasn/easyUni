import React from "react"
import { useState } from "react"
import { Group, Code } from "@mantine/core"
import utfpr from "../../assets/logos/utfpr-universidade-tecnologica-federal-do-parana-logo-6CF2B55F31-seeklogo.com.png"
import { IconBooks, IconHours24, IconLogout, IconUser, IconHome, IconSchool } from "@tabler/icons-react"
import classes from "./NavbarSimple.module.css"
import { Box } from "@mui/material"
import { colors } from "../../styles/colors"
import { useNavigate } from "react-router-dom"
import Logo from "../../assets/logos/favicon.png"

const data = [
    { link: "/student/init", label: "Início", icon: IconHome },
    { link: "/student/materias", label: "Disciplinas", icon: IconBooks },
    { link: "/student/ranking", label: "Atualizar Grade", icon: IconSchool },
    { link: "/student/atividades", label: "Ativ. Complementares", icon: IconHours24 },
]

interface MenuProps {}

export const Menu: React.FC<MenuProps> = ({}) => {
    const [active, setActive] = useState("Billing")
    const navigate = useNavigate()
    const links = data.map((item) => (
        <a
            className={classes.link}
            data-active={item.label === active || undefined}
            key={item.label}
            onClick={(event) => {
                event.preventDefault()
                setActive(item.label)
                navigate(item.link)
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ))

    return (
        <nav
            className={classes.navbar}
            style={{ backgroundColor: colors.black3, width: "15vw", padding: "2vw", borderRadius: "1vw 0 4vw 1vw" }}
        >
            <Box className={classes.navbarMain} sx={{ flexDirection: "column", gap: "1.2vw" }}>
                <Group className={classes.header} style={{ alignItems: "center", width: "100%", padding: "1vw" }}>
                    <img
                        src={utfpr}
                        style={{
                            width: "100%",
                            filter: "brightness(5%) saturate(70100%) invert(100%) hue-rotate(180deg)",
                        }}
                        onClick={() => {
                            navigate("/student/init")
                        }}
                    />
                </Group>
                <Box sx={{ pt: "2vw", flexDirection: "column", gap: "1.2vw" }}>{links}</Box>
            </Box>

            <Box className={classes.footer} sx={{ flexDirection: "column", gap: "1.2vw" }}>
                <a
                    href="/student/account"
                    className={classes.link}
                    onClick={() => {
                        navigate("/student/account")
                    }}
                >
                    <IconUser className={classes.linkIcon} stroke={1.5} />
                    <span>Minha Conta</span>
                </a>
                <p className={classes.link} onClick={() => navigate("/auth")}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Sair</span>
                </p>
                <Box sx={{ alignItems: "center", justifyContent: "space-between" }}>
                    <Code fw={700}>v1.1.0</Code>
                    <img src={Logo} style={{ width: "1.5vw" }} />
                </Box>
            </Box>
        </nav>
    )
}
