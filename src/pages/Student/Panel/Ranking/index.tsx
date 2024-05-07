import React, { useEffect, useState } from "react"
import { Box, Chip } from "@mui/material"
import { TitleUni } from "../../../../components/TitleUni"
import { colors } from "../../../../styles/colors"
import { BoxMateria } from "../../../../components/Materias/BoxMateria"
import { useHorizontalScroll } from "../../../../hooks/useHorizontalScroll"
import { useArray } from "burgos-array"
import { listMaterias } from "../../../../hooks/materias"
import { ModalRanking } from "../../../../components/Ranking/ModalRanking"

interface RankingProps {}

export const Ranking: React.FC<RankingProps> = ({}) => {
    const scrollRef = useHorizontalScroll()
    const periods = useArray().newArray(10)

    const [materias, setMaterias] = useState(listMaterias)
    const [open, setOpen] = React.useState(false)
    // const handleOpen = () => setOpen(true)

    const [loading, setLoading] = useState(false)

    const handleClick = () => {
        setLoading(true)
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
            setOpen(true)
        }, 3000)
    }, [loading])

    const updateMateria = (updatedMateria: any) => {
        const updatedMaterias = materias.map((item) => (item.code === updatedMateria.code ? updatedMateria : item))
        // Atualiza o estado das matérias
        setMaterias(updatedMaterias)
    }

    useEffect(() => {
        console.log(materias)
    }, [materias])
    return (
        <Box sx={{ width: 1, height: 1, flexDirection: "column", gap: "0.8vw", borderRadius: 0 }}>
            <TitleUni title="Atualizar Grade" button click={handleClick} loading={loading} />
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

                        {materias
                            .filter((item) => item.period == index + 1)
                            .map((materia, i) => (
                                <BoxMateria key={i} materia={materia} onUpdateMateria={updateMateria} />
                            ))}
                    </Box>
                ))}
            </Box>
            <ModalRanking open={open} setOpen={setOpen} />
        </Box>
    )
}
