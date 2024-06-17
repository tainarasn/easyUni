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
import { ModalDelete } from "../admin/ModalDelete"
import { Activity, PartialActivity } from "../../types/server/class/activity"

interface ModalUpdateActivityProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    activity: Activity
    fetchActivity: () => Promise<void>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setActivity: React.Dispatch<React.SetStateAction<Activity | null>>
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

export const ModalUpdateActivity: React.FC<ModalUpdateActivityProps> = ({
    open,
    setOpen,
    setActivity,
    activity,
    fetchActivity,
    setLoading,
}) => {
    const { snackbar } = useSnackbar()

    const [openDelete, setOpenDelete] = useState(false)
    const handleDelete = async () => {
        try {
            const response = (await api.get(`/activity/delete?id=${Number(activity.id)}`)) as Course
            snackbar({ text: "Matéria excluída!", severity: "success" })
            fetchActivity()
            setOpen(false)
            return response
        } catch (error) {
            console.log(error)
            snackbar({ text: "Algo deu errado! Tente novamente.", severity: "error" })
        }
    }

    const formik = useFormik<PartialActivity>({
        initialValues: {
            id: activity.id,
            name: activity.name,
            totalHours: activity.totalHours,
            linkCertificate: activity.linkCertificate,
            studentId: activity.studentId,
        },
        onSubmit: async (values, { resetForm }) => {
            setLoading(true)
            const data = {
                ...values,
            }
            await handleSubmit(data)
            setOpen(false)
            fetchActivity()
            resetForm()
        },
        enableReinitialize: true,
    })

    const handleSubmit = async (values: PartialActivity) => {
        try {
            console.log({ AQUI: values })
            const response = (await api.patch("/activity/update", values)) as Course
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
                        <TextFieldUni
                            label="Total de horas"
                            name="totalHours"
                            value={formik.values.totalHours}
                            onChange={formik.handleChange}
                            sx={{ width: 1 }}
                            required
                        />
                        <TextFieldUni
                            label="Link"
                            name="linkCertificate"
                            value={formik.values.linkCertificate}
                            onChange={formik.handleChange}
                            sx={{ width: 1 }}
                        />
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
