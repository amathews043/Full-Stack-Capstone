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
        primary: {
            main: '#034785',
          },
          background: {
            default: '#e1e7f3',
          },
    }
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
            paper: '#2f2a2a',
            // paper: '#373232',
          },
          primary: {
            main: '#034785',
          },
          
          text: {
            primary: '#e2cece',
          },
      },
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