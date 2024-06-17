import React, { useEffect, useState } from "react"
import { Box, Chip } from "@mui/material"
import { TitleUni } from "../../../../components/TitleUni"
import { useArray } from "burgos-array"
import { colors } from "../../../../styles/colors"
import { useHorizontalScroll } from "../../../../hooks/useHorizontalScroll"
import { MateriaBox } from "../../../../components/Materias/MateriaBox"
import { api } from "../../../../api"
import { Materia } from "../../../../types/server/class/materia"
import { useSnackbar } from "burgos-snackbar"
import { userInclusions } from "../../../../types/server/class/student"
import { useUser } from "../../../../hooks/useUser"

interface MateriasProps {}

export const Materias: React.FC<MateriasProps> = ({}) => {
    const { user } = useUser()
    const scrollRef = useHorizontalScroll()
    const periods = useArray().newArray(user?.student?.course.totalPeriods)
    const [listMaterias, setListMaterias] = useState<Materia[]>([])
    const [loading, setLoading] = useState(false)
    const { snackbar } = useSnackbar()

    const fetchMaterias = async () => {
        setLoading(true)
        try {
            const response = await api.get("/materia/all")
            setListMaterias(response.data)
            if (response) {
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            snackbar({ text: "Algo deu errado! Recarregue a página.", severity: "error" })
        }
    }

    useEffect(() => {
        fetchMaterias()
    }, [])

    return (
        <Box sx={{ width: 1, height: 1, flexDirection: "column", gap: "0.8vw", borderRadius: 0 }}>
            <TitleUni title="Resumo" />
            <Box
                ref={scrollRef}
                sx={{
                    width: "76vw",
                    height: 0.88,
                    flexDirection: "row",
                    gap: "0.8vw",
                    overflowX: "auto",
                    borderRadius: 0,
                    scrollSnapType: "x",
                    "&::-webkit-scrollbar": {
                        width: "0.3vw",
                        height: "0.3vw",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "#f1f1f1",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: colors.black3,
                        borderRadius: "0.25vw",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        background: "#555",
                    },
                }}
            >
                {periods.map((_, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1vw",
                            width: 1,
                            pb: "6vh",
                        }}
                    >
                        <Chip
                            sx={{
                                width: 1,
                                p: "1vw",
                                fontWeight: "bold",
                                borderRadius: "1vw",
                                bgcolor: colors.yellow,
                            }}
                            label={`${index + 1}º Período`}
                        />

                        {listMaterias
                            .filter((item) => item.courseId == user?.student?.courseId)
                            .filter((item) => item.period == index + 1)
                            .map((materia, i) => (
                                <MateriaBox key={i} materia={materia} />
                            ))}
                    </Box>
                ))}
            </Box>
        </Box>
    )
}
