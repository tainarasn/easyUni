import React, { useEffect, useState } from "react"
import { Box, IconButton } from "@mui/material"
import { ModalMateria } from "./ModalMateria"
import { IoEyeOutline } from "react-icons/io5"
import { FaCheck } from "react-icons/fa"
import { useFormik } from "formik"
import { colors } from "../../styles/colors"
import { listMaterias } from "../../hooks/materias"

interface BoxMateriaProps {
    materia: any
    onUpdateMateria?: (updatedMateria: any) => void
}

export const BoxMateria: React.FC<BoxMateriaProps> = ({ materia, onUpdateMateria }) => {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const [active, setActive] = useState(false)

    const formik = useFormik({
        initialValues: {
            code: materia.code || "",
            name: materia.name || "",
            totalHours: materia.totalHours || 0,
            period: materia.period || 1,
            active: materia.active || false,
            viewed: materia.viewed || false,
            requirements: materia.requirements,
        },

        onSubmit: (values: any) => {
            console.log("opa")
        },
    })

    // Verifica se algum dos pré-requisitos da matéria não foi cumprido
    const hasFalseRequirements = materia.requirements.some((requirementId: any) => {
        const requiredMateria = listMaterias.find((m) => m.id === requirementId)
        return requiredMateria && !requiredMateria.active
    })

    // Define se a matéria pode ser visualizada
    const canView = !hasFalseRequirements
    useEffect(() => {
        console.log(hasFalseRequirements)
    }, [hasFalseRequirements, listMaterias])

    const handleActiveToggle = () => {
        const updatedMateria = { ...materia, active: !materia.active } // Altera a propriedade 'active'
        onUpdateMateria && onUpdateMateria(updatedMateria) // Chama a função onUpdateMateria passando a matéria atualizada
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box
                sx={{
                    width: "12vw",
                    height: "fit-content",
                    p: "1vw",
                    borderRadius: "1vw",
                    border:
                        canView && !materia.active
                            ? "1px solid black"
                            : !materia.viewed
                            ? "1px solid #E7E7E7"
                            : materia.active && "none",
                    flexDirection: "column",
                    color: canView ? colors.black3 : "#E7E7E7",
                    bgcolor: materia.active ? "#E3F7D7" : "transparent",
                }}
            >
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontWeight: "bold" }}>{materia.code}</p>
                    <Box sx={{}}>
                        <IconButton onClick={handleOpen} sx={{ "&:focus": { outline: "none" } }}>
                            <IoEyeOutline size={"1vw"} />
                        </IconButton>
                        <IconButton
                            onClick={materia.viewed ? handleActiveToggle : () => {}}
                            sx={{ "&:focus": { outline: "none" } }}
                        >
                            <FaCheck size={"1vw"} color={materia.active ? "#59BE23" : "#E7E7E7"} />
                        </IconButton>
                    </Box>
                </Box>
                <p
                    style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                    }}
                >
                    {materia.name}
                </p>
                <ModalMateria materia={materia} open={open} setOpen={setOpen} />
            </Box>
        </form>
    )
}
