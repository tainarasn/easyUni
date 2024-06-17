import React from "react"
import { Box, Chip, Divider, Modal } from "@mui/material"
import Fade from "@mui/material/Fade"
import Backdrop from "@mui/material/Backdrop"
import { colors } from "../../styles/colors"
import { TextFieldUni } from "../TextFieldUni"
import { ButtonUni } from "../ButtonUni"
import Logo from "../../assets/logos/logo_completa (1).png"
import { useSnackbar } from "burgos-snackbar"

interface ModalSupportProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
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

export const ModalSupport: React.FC<ModalSupportProps> = ({ open, setOpen }) => {
    const { snackbar } = useSnackbar()
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
                <Box sx={{ ...style, flexDirection: "column", borderRadius: "1.5vw", gap: "0.5vw" }} onClick={() => {}}>
                    <Box sx={{ width: 1, alignItems: "center", justifyContent: "space-between" }}>
                        <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                            Relate sua dúvida ou sugestão no campo abaixo
                        </p>

                        <Chip label={"Suporte"} sx={{ bgcolor: colors.yellow, fontSize: "1.1rem" }} />
                    </Box>
                    <Divider />
                    <Box sx={{ width: 1, alignItems: "center", justifyContent: "space-between", flexDirection: "column" }}>
                        <TextFieldUni
                            label="Descrição do problema"
                            multiline
                            onChange={() => {}}
                            minRows={8}
                            sx={{ width: 1 }}
                        />
                    </Box>
                    <Box sx={{ alignItems: "center", justifyContent: "space-between" }}>
                        <img src={Logo} style={{ width: "3vw" }} />
                        <ButtonUni
                            sx={{ width: "0.2", fontSize: "0.9rem", alignSelf: "end", gap: "0.5vw" }}
                            onClick={() => {
                                setOpen(false)
                                snackbar({ text: "Mensagem enviada com sucesso!", severity: "success" })
                            }}
                        >
                            Enviar
                        </ButtonUni>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}
