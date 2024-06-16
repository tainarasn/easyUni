import React, { useState } from "react"
import {
    Box,
    Chip,
    Divider,
    Modal,
    Backdrop,
    Fade,
    CircularProgress,
    FormControl,
    InputLabel,
    Autocomplete,
    MenuItem,
    Select,
} from "@mui/material"
import { colors } from "../../styles/colors"
import { TextFieldUni } from "../TextFieldUni"
import { ButtonUni } from "../ButtonUni"
import Logo from "../../assets/logos/logo_completa (1).png"
import { FormikErrors, FormikState, FormikTouched, useFormik } from "formik"
import { useTheme } from "@mui/material/styles"
import { Theme } from "@emotion/react"
import { Course, CourseForm, PartialCourse } from "../../types/server/class/course"
import { utfprCampi } from "../../hooks/useCampi"
import { MdOutlineDeleteOutline } from "react-icons/md"
import { api } from "../../api"
import { useSnackbar } from "burgos-snackbar"
import { ModalDelete } from "./ModalDelete"

interface ModalUpdateCourseProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    course: Course
    loading: boolean
    fetchCourses: () => Promise<void>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setCourse: React.Dispatch<React.SetStateAction<Course | null>>
}

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "fit-content",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    color: colors.black3,
}

export const ModalUpdateCourse: React.FC<ModalUpdateCourseProps> = ({
    open,
    setOpen,

    loading,
    course,
    fetchCourses,
    setLoading,
    setCourse,
}) => {
    const { snackbar } = useSnackbar()

    const [openDelete, setOpenDelete] = useState(false)
    const handleDelete = async () => {
        try {
            const response = (await api.get(`/course/delete?id=${Number(course.id)}`)) as Course
            snackbar({ text: "Matéria excluída!", severity: "success" })
            fetchCourses()
            setOpen(false)
            return response
        } catch (error) {
            console.log(error)
            snackbar({ text: "Algo deu errado! Tente novamente.", severity: "error" })
        }
    }

    const formik = useFormik<PartialCourse>({
        initialValues: {
            id: course.id,
            name: course.name,
            campus: course.campus,
            matriz: course.matriz,
            totalHoursActivites: course.totalHoursActivites,
            totalHours: course.totalHours,
            totalPeriods: course.totalPeriods,
            materias: course.materias,
            trilhas: course.trilhas,
            students: course.students,
        },
        onSubmit: async (values, { resetForm }) => {
            setLoading(true)
            const data = {
                ...values,
                matriz: Number(values.matriz),
                totalPeriods: Number(values.totalPeriods),
                totalHours: Number(values.totalHours),
                totalHoursActivites: Number(values.totalHoursActivites),
            }
            await handleSubmit(data)
            setOpen(false)
            fetchCourses()
            resetForm()
        },
        enableReinitialize: true,
    })

    const handleSubmit = async (values: PartialCourse) => {
        if (loading) return
        try {
            console.log({ AQUI: values })
            const response = (await api.patch("/course/update", values)) as Course
            snackbar({ text: "Curso atualizado!", severity: "success" })
            setLoading(false)
            return response
        } catch (error) {
            console.log(error)
            snackbar({ text: "Algo deu errado! Tente novamente.", severity: "error" })
        }
    }
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={() => {
                setOpen(false)
            }}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            style={{
                borderRadius: "0vw", // Definindo o raio da borda do modal
                // Outras propriedades de estilo do modal podem ser adicionadas aqui
            }}
        >
            <Fade in={open}>
                <Box sx={{ ...style, flexDirection: "column", borderRadius: "1.5vw", gap: "0.5vw" }} onClick={() => {}}>
                    <Box sx={{ width: 1, alignItems: "center", justifyContent: "space-between" }}>
                        <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Editar Curso</p>

                        <Chip label={"Administração"} sx={{ bgcolor: colors.yellow, fontSize: "0.9rem" }} />
                    </Box>
                    <Divider />
                    <Box
                        sx={{
                            width: 1,
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "column",
                            gap: "1vw",
                        }}
                    >
                        <TextFieldUni
                            label="Nome"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            sx={{ width: 1 }}
                            required
                        />
                        <FormControl fullWidth>
                            <InputLabel id="campus-select-label">Campus</InputLabel>
                            <Select
                                labelId="campus-select-label"
                                id="campus-select"
                                value={formik?.values.campus}
                                onChange={(event) => {
                                    //@ts-ignore
                                    formik.setFieldValue("campus", event.target.value)
                                }}
                                label="Campus"
                                sx={{ borderRadius: "1vw" }}
                            >
                                <MenuItem value="">Selecionar Campus</MenuItem>
                                {utfprCampi.map((campus) => (
                                    <MenuItem key={campus.key} value={campus.key}>
                                        {campus.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box sx={{ width: 1, gap: "0.7vw" }}>
                            <TextFieldUni
                                label="Matriz"
                                name="matriz"
                                value={formik.values.matriz}
                                onChange={formik.handleChange}
                                sx={{ width: 1 }}
                                required
                            />
                            <TextFieldUni
                                label="Total de períodos"
                                name="totalPeriods"
                                value={formik.values.totalPeriods}
                                onChange={formik.handleChange}
                                sx={{ width: 1 }}
                                required
                            />
                        </Box>
                        <Box sx={{ width: 1, gap: "0.7vw" }}>
                            <TextFieldUni
                                label="Carga horária total"
                                name="totalHours"
                                value={formik.values.totalHours}
                                onChange={formik.handleChange}
                                sx={{ width: 1 }}
                                required
                            />
                            <TextFieldUni
                                label="Carga horária de atividades complementares"
                                name="totalHoursActivites"
                                value={formik.values.totalHoursActivites}
                                onChange={formik.handleChange}
                                sx={{ width: 1 }}
                                required
                            />
                        </Box>
                    </Box>
                    <Box sx={{ alignItems: "center", justifyContent: "space-between" }}>
                        <img src={""} style={{ width: "3vw" }} />
                        <Box sx={{ width: 0.4, gap: "0.5vw" }}>
                            <ButtonUni
                                variant="outlined"
                                sx={{ width: 0.5, fontSize: "0.9rem", alignSelf: "end", bgcolor: "#fff" }}
                                onClick={() => setOpenDelete(true)}
                            >
                                <MdOutlineDeleteOutline size={"1vw"} />
                                Excluir
                            </ButtonUni>
                            <ButtonUni
                                type="submit"
                                sx={{ width: 0.5, fontSize: "0.9rem", alignSelf: "end", gap: "0.5vw" }}
                                onClick={() => {
                                    formik.handleSubmit()
                                }}
                            >
                                Salvar
                            </ButtonUni>
                        </Box>
                    </Box>
                    <ModalDelete click={handleDelete} open={openDelete} setOpen={setOpenDelete} />
                </Box>
            </Fade>
        </Modal>
    )
}
