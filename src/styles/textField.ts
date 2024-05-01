import { colors } from "./colors"

export const style_textfield = {
    "& .MuiInputLabel-root.Mui-focused ": {
        color: colors.primary,
        // Removendo a propriedade border
    },
    "& .MuiInputLabel-root ": {
        color: "#ECE6F0",
    },
    "& .MuiOutlinedInput-root": {
        fieldset: {
            borderRadius: "1vw",
            border: "0.5px solid #ECE6F0",
        },
    },
    "& .MuiOutlinedInput-input": {
        // height: "3vw",
    },
    "& .MuiInputBase-input.MuiOutlinedInput-input:-webkit-autofill": {
        "-webkit-box-shadow": ` 0 0 0 100px ${colors.secondary} inset`,
        borderRadius: "1vw",
        color: "#fff",
        bgcolor: "",
    },
}

// export const input: SxProps = {
//     "& .MuiInputBase-root": { color: "#fff", bgcolor: "#fff1" },
//     "& .MuiInputLabel-root.Mui-focused ": {
//         color: "#fff", // Cor do label quando o TextField está em foco (digitando)
//     },
//     "& .MuiInputLabel-root ": {
//         color: "#fff",
//     },
//     "& .MuiOutlinedInput-root": {
//         borderColor: colors.secondary,
//         fieldset: {
//             borderColor: colors.primary,
//         },
//     },
//     "& .MuiInputBase-input.MuiOutlinedInput-input:-webkit-autofill": {
//         "-webkit-box-shadow": ` 0 0 0 100px ${colors.button} inset`,
//         borderRadius: "1vw",
//         color: "#fff",
//         bgcolor: "",
//     },
// }
