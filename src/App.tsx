import "./App.css"
import { ThemeProvider } from "@mui/material"
import { BrowserRouter } from "react-router-dom"
import { Providers } from "./Providers"
import { useMuiTheme } from "./hooks/useMuiTheme"
import { MantineProvider } from "@mantine/core"
import { Routes } from "./Routes"

function App() {
    const theme = useMuiTheme()

    return (
        <MantineProvider>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Providers>
                        <Routes />
                    </Providers>
                </BrowserRouter>
            </ThemeProvider>
        </MantineProvider>
    )
}

export default App
