import React from "react"
import { Box, Chip } from "@mui/material"
import { TitleUni } from "../../../../components/TitleUni"
import { useArray } from "burgos-array"
import { colors } from "../../../../styles/colors"
import { useHorizontalScroll } from "../../../../hooks/useHorizontalScroll"
import { MateriaBox } from "../../../../components/Materias/MateriaBox"

interface MateriasProps {}

export const Materias: React.FC<MateriasProps> = ({}) => {
    const scrollRef = useHorizontalScroll()
    const periods = useArray().newArray(10)
    const materias = [
        { code: "EC101", name: "Introdução à Engenharia de Computação", totalHours: 60, period: 1 },
        { code: "EC102", name: "Matemática para Engenharia", totalHours: 90, period: 1 },
        { code: "EC103", name: "Programação I", totalHours: 90, period: 1 },
        { code: "EC104", name: "Física para Engenharia", totalHours: 90, period: 1 },
        { code: "EC105", name: "Circuitos Elétricos", totalHours: 90, period: 2 },
        { code: "EC106", name: "Algoritmos e Estruturas de Dados", totalHours: 90, period: 2 },
        { code: "EC107", name: "Cálculo Numérico", totalHours: 60, period: 2 },
        { code: "EC108", name: "Sistemas Digitais", totalHours: 90, period: 2 },
        { code: "EC109", name: "Programação II", totalHours: 90, period: 2 },
        { code: "EC110", name: "Eletrônica Analógica", totalHours: 90, period: 3 },
        { code: "EC111", name: "Banco de Dados", totalHours: 60, period: 3 },
        { code: "EC112", name: "Redes de Computadores", totalHours: 90, period: 3 },
        { code: "EC113", name: "Engenharia de Software", totalHours: 90, period: 3 },
        { code: "EC114", name: "Sistemas Operacionais", totalHours: 90, period: 3 },
        { code: "EC115", name: "Probabilidade e Estatística", totalHours: 60, period: 4 },
        { code: "EC116", name: "Inteligência Artificial", totalHours: 90, period: 4 },
        { code: "EC117", name: "Computação Gráfica", totalHours: 90, period: 4 },
        { code: "EC118", name: "Segurança de Dados", totalHours: 60, period: 4 },
        { code: "EC119", name: "Projeto Integrador I", totalHours: 90, period: 5 },
        { code: "EC120", name: "Projeto Integrador II", totalHours: 90, period: 6 },
        { code: "EC121", name: "Sistemas Embarcados", totalHours: 90, period: 6 },
        { code: "EC122", name: "Gestão de Projetos", totalHours: 60, period: 7 },
        { code: "EC123", name: "Arquitetura de Computadores", totalHours: 90, period: 7 },
        { code: "EC124", name: "Desenvolvimento Web", totalHours: 90, period: 7 },
        { code: "EC125", name: "Comunicação de Dados", totalHours: 60, period: 8 },
        { code: "EC126", name: "Sistemas Distribuídos", totalHours: 90, period: 8 },
        { code: "EC127", name: "Linguagens de Programação", totalHours: 90, period: 8 },
        { code: "EC128", name: "Gestão da Inovação", totalHours: 60, period: 9 },
        { code: "EC129", name: "Empreendedorismo", totalHours: 60, period: 9 },
        { code: "EC130", name: "Interação Humano-Computador", totalHours: 90, period: 9 },
        { code: "EC131", name: "Tópicos Avançados em Engenharia de Computação", totalHours: 90, period: 9 },
        { code: "EC132", name: "Trabalho de Conclusão de Curso I", totalHours: 90, period: 10 },
        { code: "EC133", name: "Trabalho de Conclusão de Curso II", totalHours: 90, period: 10 },
    ]
    return (
        <Box sx={{ width: 1, height: 1, flexDirection: "column", gap: "0.8vw", borderRadius: 0 }}>
            <TitleUni title="Resumo" button />
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
                                <MateriaBox key={i} materia={materia} />
                            ))}
                    </Box>
                ))}
            </Box>
        </Box>
    )
}
