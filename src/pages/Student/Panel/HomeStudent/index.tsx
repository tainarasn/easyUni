import React, { useEffect, useState } from "react"
import { Box, Chip, Grid } from "@mui/material"
import { TitleUni } from "../../../../components/TitleUni"
import { colors } from "../../../../styles/colors"
import { Resume } from "../../../../components/Resume"
import { CourseCard } from "../../../../components/admin/CourseCard"
import { User } from "../../../../types/server/class/user"
import { useUser } from "../../../../hooks/useUser"
import { api } from "../../../../api"
import { Activity } from "../../../../types/server/class/activity"
import { MateriaCard } from "../../../../components/admin/MateriaCard"
import { ActivityCard } from "../../../../components/admin/ActivityCard"

interface HomeStudentProps {}

export const HomeStudent: React.FC<HomeStudentProps> = ({}) => {
    const { user } = useUser()
    const [listActivity, setListActivity] = useState<Activity[]>([])

    const fetchActivity = async () => {
        try {
            const response = await api.get("/activity/all")
            setListActivity(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const materiasEngComp = [
        "Cálculo I",
        "Robótica I",
        "Álgebra Linear",
        "Introdução à Programação",
        "Circuitos Digitais",
        "Robótica II",
    ]

    useEffect(() => {
        fetchActivity()
        console.log()
    }, [])
    return (
        <Box sx={{ width: 1, height: 1, flexDirection: "column", gap: "0.8vw" }}>
            <TitleUni title="Resumo" />
            <Grid container spacing={1}>
                {materiasEngComp.map((item, index) => (
                    <Grid item xs={1.5} key={index}>
                        <Chip
                            sx={{
                                width: 1,
                                bgcolor: colors.yellow,
                            }}
                            label={item}
                        />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ width: 1, height: 1, flexDirection: "row", gap: "1vw" }}>
                <Box
                    sx={{
                        width: 0.5,
                        flexGrow: 1,
                        height: 1,
                        gap: "1vw",
                        flexDirection: "column",
                        borderRadius: 0,
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{
                            width: 1,
                            height: 1,
                            flexDirection: "row",
                            borderRadius: "1vw",
                            gap: "1vw",
                        }}
                    >
                        <CourseCard course={user?.student?.course} student />
                    </Box>

                    <Box
                        sx={{
                            width: 1,
                            height: 0.6,
                            flexDirection: "column",
                            borderRadius: 0,
                            gap: "1vw",
                        }}
                    >
                        {" "}
                        <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>Atividades Complementares</p>
                        {listActivity.slice(0.4).map((item, i) => (
                            <ActivityCard home activity={item} key={i} />
                        ))}
                    </Box>
                </Box>
                {user && <Resume user={user} />}
            </Box>
        </Box>
    )
}
