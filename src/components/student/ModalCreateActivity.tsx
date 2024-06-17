import React from "react"
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
    MenuItem,
    Select,
} from "@mui/material"
import { colors } from "../../styles/colors"
import { TextFieldUni } from "../TextFieldUni"
import { ButtonUni } from "../ButtonUni"
import { FormikErrors, FormikState, FormikTouched } from "formik"
import { Theme } from "@emotion/react"
import { utfprCampi } from "../../hooks/useCampi"
import { ActivityForm } from "../../types/server/class/activity"

interface ModalCreateActivityProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    formik: {
        values: ActivityForm
        errors: FormikErrors<ActivityForm>
        touched: FormikTouched<ActivityForm>
        handleChange: (e: React.ChangeEvent<any>) => void
        handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
        resetForm: (nextState?: Partial<FormikState<ActivityForm>>) => void
    }
    loading: boolean
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

export const ModalCreateActivity: React.FC<ModalCreateActivityProps> = ({ open, setOpen, formik, loading }) => {
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
                        <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Novo Curso</p>

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
                        />
                        <TextFieldUni
                            label="Link"
                            name="linkCertificate"
                            value={formik.values.linkCertificate}
                            onChange={formik.handleChange}
                            sx={{ width: 1 }}
                            required
                        />
                    </Box>
                    <Box sx={{ alignItems: "center", justifyContent: "space-between" }}>
                        <img src={""} style={{ width: "3vw" }} />
                        <ButtonUni
                            type="submit"
                            sx={{ width: "0.2", fontSize: "0.9rem", alignSelf: "end", gap: "0.5vw" }}
                            onClick={() => {
                                formik.handleSubmit()
                                setOpen(false)
                            }}
                        >
                            {loading ? <CircularProgress sx={{ color: "#fff" }} size="1vw" /> : "Salvar"}
                        </ButtonUni>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}
