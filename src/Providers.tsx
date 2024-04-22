import { ConfirmDialog, ConfirmDialogProvider } from "burgos-confirm"
import { Snackbar, SnackbarProvider } from "burgos-snackbar"
import { IoProvider } from "./contexts/ioContext"
// import { HeaderProvider } from "./contexts/headerContext"
import { MantineProvider, useMantineTheme } from "@mantine/core"

import { UserProvider } from "./contexts/userContext"

interface ProvidersProps {
    children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    const mantine_theme = useMantineTheme()

    return (
        <SnackbarProvider>
            <ConfirmDialogProvider>
                <IoProvider>
                    <UserProvider>
                        {/* <HeaderProvider> */}
                        <Snackbar />
                        <ConfirmDialog />
                        <MantineProvider theme={mantine_theme}>{children}</MantineProvider>
                        {/* {children} */}
                        {/* </HeaderProvider> */}
                    </UserProvider>
                </IoProvider>
            </ConfirmDialogProvider>
        </SnackbarProvider>
    )
}
