import React from "react"
import { Box, Chip, Divider, Modal, Rating } from "@mui/material"
import Fade from "@mui/material/Fade"
import Backdrop from "@mui/material/Backdrop"
import { colors } from "../../styles/colors"
import { TextFieldUni } from "../TextFieldUni"
import { ButtonUni } from "../ButtonUni"
import Logo from "../../assets/logos/logo_completa (1).png"

interface ModalRankingProps {
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

export const ModalRanking: React.FC<ModalRankingProps> = ({ open, setOpen }) => {
    const [value, setValue] = React.useState<number | null>(2)
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
                        <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{"Engenharia da Computação"}</p>
                        <Chip label={"844"} sx={{ bgcolor: colors.yellow, fontSize: "1.1rem" }} />
                    </Box>

                    <Divider />
                    <Box sx={{ width: 1, justifyContent: "space-between", flexDirection: "column", gap: "0.5vw" }}>
                        <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Maiores barreiras:</p>
                        <Box sx={{ width: 1, justifyContent: "space-between", flexDirection: "column", gap: "0.3vw" }}>
                            <Box sx={{ width: 1, alignItems: "center", justifyContent: "space-between" }}>
                                <Box sx={{ alignItems: "center", gap: "0.5vw" }}>
                                    <Chip label={"1º"} sx={{ bgcolor: colors.yellow }} />
                                    <p> Programação I</p>
                                </Box>
                                <Chip label={"EC015"} sx={{}} />
                            </Box>
                            <Box sx={{ width: 1, alignItems: "center", justifyContent: "space-between" }}>
                                <Box sx={{ alignItems: "center", gap: "0.5vw" }}>
                                    <Chip label={"2º"} sx={{ bgcolor: colors.yellow }} />
                                    <p>Banco de Dados</p>
                                </Box>
                                <Chip label={"EC023"} sx={{}} />
                            </Box>
                            <Box sx={{ width: 1, alignItems: "center", justifyContent: "space-between" }}>
                                <Box sx={{ alignItems: "center", gap: "0.5vw" }}>
                                    <Chip label={"3º"} sx={{ bgcolor: colors.yellow }} />
                                    <p>Física III</p>
                                </Box>
                                <Chip label={"FS899"} sx={{}} />
                            </Box>
                            <Box sx={{ width: 1, alignItems: "center", justifyContent: "space-between" }}>
                                <Box sx={{ alignItems: "center", gap: "0.5vw" }}>
                                    <Chip label={"4º"} sx={{ bgcolor: colors.yellow }} />
                                    <p>Sistemas Digitais</p>
                                </Box>
                                <Chip label={"EL01K"} sx={{}} />
                            </Box>
                            <Box sx={{ width: 1, alignItems: "center", justifyContent: "space-between" }}>
                                <Box sx={{ alignItems: "center", gap: "0.5vw" }}>
                                    <Chip label={"5º"} sx={{ bgcolor: colors.yellow }} />
                                    <p>Eletricidade</p>
                                </Box>
                                <Chip label={"PT548"} sx={{}} />
                            </Box>
                        </Box>
                    </Box>
                    <Divider />
                    <Box
                        sx={{ width: 1, justifyContent: "space-between", flexDirection: "column", gap: "0.5vw", pt: "2vh" }}
                    >
                        <Box
                            sx={{
                                width: 1,
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexDirection: "row",
                                gap: "0.5vw",
                            }}
                        >
                            <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Feedback</p>
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue)
                                }}
                            />
                        </Box>

                        <TextFieldUni
                            label="Acertamos? Dê sua opinião sobre as recomendações geradas."
                            multiline
                            onChange={() => {}}
                            minRows={1}
                            sx={{ width: 1 }}
                        />
                    </Box>
                    <Box sx={{ alignItems: "center", justifyContent: "space-between", pt: "3vh" }}>
                        <img src={Logo} style={{ width: "3vw" }} />
                        <ButtonUni
                            sx={{ width: "0.2", fontSize: "0.9rem", alignSelf: "end", gap: "0.5vw" }}
                            onClick={() => {
                                setOpen(false)
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
