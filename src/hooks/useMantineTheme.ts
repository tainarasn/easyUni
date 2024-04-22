import { createTheme } from "@mantine/core"
import { colors } from "../styles/colors"

export const useMantineTheme = () => {
    const theme = createTheme({
        colors: {
            brown: [
                colors.primary,
                colors.secondary,
                colors.primary,
                colors.primary,
                colors.primary,
                colors.primary,
                colors.primary,
                colors.primary,
                colors.primary,
                colors.primary,
            ],
        },

    })

    return theme
}
