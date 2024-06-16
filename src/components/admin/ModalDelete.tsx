import React, { useState } from "react"
import { Box, Divider, Modal, Backdrop, Fade } from "@mui/material"
import { colors } from "../../styles/colors"
import { ButtonUni } from "../ButtonUni"

interface ModalDeleteProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>

    click: () => void
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

export const ModalDelete: React.FC<ModalDeleteProps> = ({ open, setOpen, click }) => {
    const [loading, setLoading] = useState(false)

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
                        <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Tem certeza que deseja excluir?</p>
                    </Box>
                    <Divider />

                    <Box sx={{ alignItems: "center", justifyContent: "space-between" }}>
                        <Box sx={{ width: 1, gap: "0.5vw" }}>
                            <ButtonUni
                                variant="outlined"
                                sx={{ width: 0.5, fontSize: "0.9rem", alignSelf: "end", bgcolor: "#fff" }}
                                onClick={() => setOpen(false)}
                            >
                                Cancelar
                            </ButtonUni>
                            <ButtonUni
                                type="submit"
                                sx={{ width: 0.5, fontSize: "0.9rem", alignSelf: "end", gap: "0.5vw" }}
                                onClick={click}
                            >
                                Sim, excluir
                            </ButtonUni>
                        </Box>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}
