
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { Craft } from './Craft'
import { ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
    palette: {
        mode: 'dark',
    }
});


const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <ThemeProvider theme={theme}>
         <CssBaseline />
    <BrowserRouter>
        <Craft />
    </BrowserRouter>
    </ThemeProvider>
)
