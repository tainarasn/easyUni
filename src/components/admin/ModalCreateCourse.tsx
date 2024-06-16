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
import { FormikErrors, FormikState, FormikTouched } from "formik"
import { useTheme } from "@mui/material/styles"
import { Theme } from "@emotion/react"
import { CourseForm } from "../../types/server/class/course"
import { utfprCampi } from "../../hooks/useCampi"

interface ModalCreateCourseProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    formik: {
        values: CourseForm
        errors: FormikErrors<CourseForm>
        touched: FormikTouched<CourseForm>
        handleChange: (e: React.ChangeEvent<any>) => void
        handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
        resetForm: (nextState?: Partial<FormikState<CourseForm>>) => void
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

export const ModalCreateCourse: React.FC<ModalCreateCourseProps> = ({ open, setOpen, formik, loading }) => {
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

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 300,
        },
    },
}

function getStyles(name: string, selectedMateriaCodes: string[], theme: Theme) {
    return {
        fontWeight: selectedMateriaCodes.some((code) => name === code) ? "bold" : "400",
    }
}
