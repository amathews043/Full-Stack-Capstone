import { ApplicationView } from "./views/ApplicationView"
import { NavBar } from "./components/nav/NavBar"
import "./Craft.css"
import { ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from "react"

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    }
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
});


export const Craft = () => {
    const [toggle, setToggle] = useState(true)

    const toggleTheme = () => {
        setToggle((prevMode) => (prevMode === true ? false : true))
    }

    const theme = toggle === true ? lightTheme : darkTheme;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavBar toggleTheme={toggleTheme} toggle={toggle}/>
            <ApplicationView />
        </ThemeProvider>
    );
};