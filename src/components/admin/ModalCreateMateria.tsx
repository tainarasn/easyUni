import React, { useState } from "react"
import {
    Box,
    Chip,
    Divider,
    Modal,
    Backdrop,
    Fade,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material"
import { colors } from "../../styles/colors"
import { TextFieldUni } from "../TextFieldUni"
import { ButtonUni } from "../ButtonUni"
import Logo from "../../assets/logos/logo_completa (1).png"
import { Materia, MateriaForm } from "../../types/server/class/materia"
import { FormikErrors, FormikState, FormikTouched } from "formik"
import { useTheme } from "@mui/material/styles"
import { Theme } from "@emotion/react"

interface ModalCreateMateriaProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    materias: Materia[]
    formik: {
        values: MateriaForm
        errors: FormikErrors<MateriaForm>
        touched: FormikTouched<MateriaForm>
        handleChange: (e: React.ChangeEvent<any>) => void
        handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
        resetForm: (nextState?: Partial<FormikState<MateriaForm>>) => void
    }
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

export const ModalCreateMateria: React.FC<ModalCreateMateriaProps> = ({ open, setOpen, formik, materias }) => {
    const theme = useTheme()
    const [selectedMateriaCodes, setSelectedMateriaCodes] = useState<string[]>([])

    const handleMateriaChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event
        setSelectedMateriaCodes(typeof value === "string" ? value.split(",") : value)
    }

    const handleSave = () => {
        const selectedMaterias = materias.filter((materia) => selectedMateriaCodes.includes(materia.code))
        //@ts-ignore
        formik.setValues({
            ...formik.values,
            prerequisites: selectedMaterias,
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
                        <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Adicionar Disciplina</p>

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
                        <Box sx={{ width: 1, gap: "0.7vw" }}>
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
                        <Box sx={{ width: 1, gap: "0.7vw" }}>
                            <TextFieldUni
                                label="Período"
                                name="period"
                                value={formik.values.period}
                                onChange={formik.handleChange}
                                sx={{ width: 1 }}
                                required
                            />
                            <TextFieldUni
                                label="Período minímo"
                                name="periodRequire"
                                value={formik.values.periodRequire}
                                onChange={formik.handleChange}
                                sx={{ width: 1 }}
                            />
                            <TextFieldUni
                                label="Carga horária total"
                                name="periodRequire"
                                value={formik.values.totalHours}
                                onChange={formik.handleChange}
                                sx={{ width: 1 }}
                                required
                            />
                        </Box>
                        <TextFieldUni
                            select
                            label="Curso"
                            name="course"
                            value={formik.values.course}
                            onChange={formik.handleChange}
                            sx={{ width: 1 }}
                            required
                        />

                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel id="demo-multiple-chip-label">Pré-Requisitos</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={selectedMateriaCodes}
                                onChange={handleMateriaChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Pré-Requisitos" />}
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
                    <Box sx={{ alignItems: "center", justifyContent: "space-between" }}>
                        <img src={""} style={{ width: "3vw" }} />
                        <ButtonUni
                            type="submit"
                            sx={{ width: "0.2", fontSize: "0.9rem", alignSelf: "end", gap: "0.5vw" }}
                            onClick={handleSave}
                        >
                            Salvar
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
