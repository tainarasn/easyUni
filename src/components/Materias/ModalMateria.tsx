import React from "react"
import { Box, Chip, Divider, Modal } from "@mui/material"
import Fade from "@mui/material/Fade"
import Backdrop from "@mui/material/Backdrop"
import { colors } from "../../styles/colors"

interface ModalMateriaProps {
    materia: any
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "20%",
    height: "fit-content",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    color: colors.black3,
}

export const ModalMateria: React.FC<ModalMateriaProps> = ({ open, setOpen, materia }) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={() => {
                setOpen(false)
            }}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
            style={{
                borderRadius: "0vw", // Definindo o raio da borda do modal
                // Outras propriedades de estilo do modal podem ser adicionadas aqui
            }}
        >
            <Fade in={open}>
                <Box
                    sx={{ ...style, flexDirection: "column", borderRadius: "1.5vw", gap: "0.5vw" }}
                    onClick={() => {
                        setOpen(false)
                    }}
                >
                    <Box sx={{ width: 1, alignItems: "center", justifyContent: "space-between" }}>
                        <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{materia.name}</p>
                        <Chip label={materia.code} sx={{ bgcolor: colors.yellow, fontSize: "1.1rem" }} />
                    </Box>
                    <Divider />
                    <Box sx={{ width: 1, alignItems: "center", justifyContent: "space-between", flexDirection: "column" }}>
                        <Box sx={{ width: 1, alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
                            <p style={{}}>Período:</p>
                            <p style={{ fontWeight: "bold" }}>{materia.period}º</p>
                        </Box>
                        <Box sx={{ width: 1, alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
                            <p style={{}}>Total de horas:</p>
                            <p style={{ fontWeight: "bold" }}>{materia.totalHours}h</p>
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ width: 1, justifyContent: "space-between", flexDirection: "column", gap: "0.5vw" }}>
                        <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Pré-Requisitos</p>
                        <Box sx={{ width: 1, justifyContent: "space-between", flexDirection: "column", gap: "0.3vw" }}>
                            <Box sx={{ width: 1, alignItems: "center", justifyContent: "space-between" }}>
                                <p>Programação I</p>
                                <Chip label={materia.code} sx={{}} />
                            </Box>
                            <Box sx={{ width: 1, alignItems: "center", justifyContent: "space-between" }}>
                                <p>Banco de Dados</p>
                                <Chip label={materia.code} sx={{}} />
                            </Box>
                            <Box sx={{ width: 1, alignItems: "center", justifyContent: "space-between" }}>
                                <p>Programação I</p>
                                <Chip label={materia.code} sx={{}} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}
