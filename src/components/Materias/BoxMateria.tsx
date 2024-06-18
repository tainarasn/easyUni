import React, { useEffect } from "react"
import { Box, IconButton } from "@mui/material"
import { ModalMateria } from "./ModalMateria"
import { IoEyeOutline } from "react-icons/io5"
import { FaCheck } from "react-icons/fa"
import { useFormik } from "formik"
import { colors } from "../../styles/colors"
import { listMaterias } from "../../hooks/materias"
import { Materia } from "../../types/server/class/materia"
import { api } from "../../api"
import { useUser } from "../../hooks/useUser"

interface BoxMateriaProps {
    materia: Materia
    onUpdateMateria?: (updatedMateria: Materia) => void
    fetchMaterias: () => Promise<void>
    setListMaterias: React.Dispatch<React.SetStateAction<Materia[]>>
}

export const BoxMateria: React.FC<BoxMateriaProps> = ({ materia, onUpdateMateria, fetchMaterias, setListMaterias }) => {
    const [open, setOpen] = React.useState(false)

    const handleOpen = () => setOpen(true)
    const { user } = useUser()
    const formik = useFormik({
        initialValues: {
            code: materia.code || "",
            name: materia.name || "",
            totalHours: materia.totalHours || 0,
            period: materia.period || 1,
            prerequisites: materia.prerequisites,
        },

        onSubmit: () => {
            console.log("opa")
        },
    })

    // Verifica se algum dos pré-requisitos da matéria não foi cumprido
    const hasFalseRequirements = materia.prerequisites.some((requirementId: any) => {
        const requiredMateria = listMaterias.find((m) => m.id === requirementId)
        return requiredMateria && !requiredMateria.active
    })

    // Define se a matéria pode ser visualizada
    const canView = !hasFalseRequirements
    useEffect(() => {
        console.log(hasFalseRequirements)
    }, [hasFalseRequirements, listMaterias])

    const handleAddMateria = async () => {
        try {
            const response = await api.post("/user/addMateria", { materiaId: materia.id, studentId: user?.student?.id })
            console.log(response)

            if (response) {
                const fetchMaterias = async () => {
                    try {
                        const response = await api.get("/materia/all")
                        setListMaterias(response.data)
                    } catch (error) {
                        console.log(error)
                    }
                }
                fetchMaterias()
            }
        } catch (error) {}
    }

    const cursada = user?.student?.materiasCursadas.find((item: Materia) => item.id === materia.id)

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box
                sx={{
                    width: "12vw",
                    height: "fit-content",
                    p: "1vw",
                    borderRadius: "1vw",
                    border: cursada ? "1px solid #E7E7E7" : "1px solid black",
                    flexDirection: "column",
                    color: canView ? colors.black3 : "#E7E7E7",
                    bgcolor: cursada ? "#E3F7D7" : "transparent",
                }}
            >
                <Box sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontWeight: "bold" }}>{materia.code}</p>
                    <Box sx={{}}>
                        <IconButton onClick={handleOpen} sx={{ "&:focus": { outline: "none" } }}>
                            <IoEyeOutline size={"1vw"} />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                handleAddMateria()
                            }}
                            sx={{ "&:focus": { outline: "none" } }}
                        >
                            <FaCheck size={"1vw"} color={cursada ? "green" : "gray"} />
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
