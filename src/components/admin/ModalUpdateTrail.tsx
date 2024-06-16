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
    SelectChangeEvent,
    OutlinedInput,
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
import { PartialTrail, Trail } from "../../types/server/class/trail"
import { Materia } from "../../types/server/class/materia"

interface ModalUpdateTrailProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    trail: Trail
    loading: boolean
    fetchCourses: () => Promise<void>
    fetchTrails: () => Promise<void>
    courses: Course[]
    materias: Materia[]
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setTrail: React.Dispatch<React.SetStateAction<Trail | null>>
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

export const ModalUpdateTrail: React.FC<ModalUpdateTrailProps> = ({
    open,
    setOpen,
    courses,
    loading,
    trail,
    materias,
    fetchCourses,
    fetchTrails,
    setLoading,
    setTrail,
}) => {
    const { snackbar } = useSnackbar()
    const theme = useTheme()

    const [openDelete, setOpenDelete] = useState(false)
    const handleDelete = async () => {
        try {
            const response = (await api.get(`/trail/delete?id=${Number(trail.id)}`)) as Course
            snackbar({ text: "Trilha excluída!", severity: "success" })
            fetchTrails()
            setOpen(false)
            return response
        } catch (error) {
            console.log(error)
            snackbar({ text: "Algo deu errado! Tente novamente.", severity: "error" })
        }
    }

    const formik = useFormik<PartialTrail>({
        initialValues: {
            id: trail.id,
            code: trail.code,
            name: trail.name,
            course: trail.course,
            courseId: trail.courseId,
            materias: trail.materias || [],
        },
        onSubmit: async (values, { resetForm }) => {
            const data = {
                ...values,
                materias: values.materias?.map((materia) => ({ id: materia.id })),
            }
            console.log(values)
            await handleSubmit(data) // Certifique-se de que handleSubmit seja uma função assíncrona que envie os dados
            fetchTrails()
            resetForm()
        },
        enableReinitialize: true,
    })

    const handleSubmit = async (values: PartialTrail) => {
        if (loading) return
        try {
            console.log({ AQUI: values })
            const response = (await api.patch("/trail/update", values)) as Trail
            snackbar({ text: "Trilha atualizada!", severity: "success" })
            return response
        } catch (error) {
            console.log(error)
            snackbar({ text: "Algo deu errado! Tente novamente.", severity: "error" })
        }
    }

    const [selectedMateriaCodes, setSelectedMateriaCodes] = useState<string[]>(
        trail.materias ? trail.materias.map((materia) => materia.code) : []
    )

    const handleMateriaChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event
        setSelectedMateriaCodes(typeof value === "string" ? value.split(",") : value)
    }

    const handleSave = () => {
        const selectedMaterias = materias.filter((materia) => selectedMateriaCodes.includes(materia.code))

        formik.setValues({
            ...formik.values,
            materias: selectedMaterias,
        })
        formik.handleSubmit()
        setOpen(false)
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
                        <Box sx={{ width: 1, gap: "0.7vw", flexDirection: "column" }}>
                            <Box sx={{ gap: "0.5vw" }}>
                                <TextFieldUni
                                    label="Nome"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    sx={{ width: 1 }}
                                    required
                                />
                                <TextFieldUni
                                    label="Código"
                                    name="code"
                                    value={formik.values.code}
                                    onChange={formik.handleChange}
                                    sx={{ width: 1 }}
                                    required
                                />
                            </Box>
                            <Autocomplete
                                options={courses}
                                getOptionLabel={(option) => option.name}
                                value={formik.values.course || null}
                                onChange={(event, value) => {
                                    formik.setFieldValue("course", value)
                                    formik.setFieldValue("courseId", value ? value.id : null)
                                }}
                                renderInput={(params) => <TextFieldUni {...params} label="Curso" />}
                            />

                            <FormControl sx={{ width: "100%" }}>
                                <InputLabel id="demo-multiple-chip-label">Disciplinas</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={selectedMateriaCodes}
                                    onChange={handleMateriaChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Disciplinas" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                            {selected.map((code) => {
                                                const materia = materias.find((m) => m.code === code)
                                                return materia ? <Chip key={code} label={materia.name} /> : null
                                            })}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                    sx={{ borderRadius: "1vw", p: "" }}
                                >
                                    {materias.map((materia) => (
                                        <MenuItem
                                            key={materia.code}
                                            value={materia.code}
                                            style={getStyles(materia.name, selectedMateriaCodes, theme)}
                                        >
                                            {materia.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Divider />
                        <Box sx={{ width: 1, alignItems: "center", justifyContent: "space-between" }}>
                            <img src={""} style={{ width: "3vw" }} />
                            <Box sx={{ width: 0.5, gap: "0.5vw" }}>
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
                                    onClick={handleSave}
                                >
                                    Salvar
                                </ButtonUni>
                            </Box>
                        </Box>
                        <ModalDelete open={openDelete} setOpen={setOpenDelete} click={handleDelete} />
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

function getStyles(name: string, selectedMateriaCodes: readonly string[], theme: Theme) {
    return {
        fontWeight: selectedMateriaCodes.indexOf(name) === -1 ? "bold" : "400",
    }
}
