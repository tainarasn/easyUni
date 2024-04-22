import { createTheme } from "@mui/material"
import { colors } from "../styles/colors"
export const useMuiTheme = () => {
    const THEME = createTheme({
        typography: {
            fontFamily: [""].join(","),
            fontSize: 14,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            fontWeightBold: 600,
        },
        palette: {
            // mode: 'dark',

            primary: {
                main: colors.primary,
            },
            secondary: {
                main: colors.secondary,
            },

            text: {
                primary: colors.primary,
                secondary: colors.secondary,
                // disabled: colors.primary,
            },
            error: { main: "#B3261E" },
        },
    })

    return THEME
}
