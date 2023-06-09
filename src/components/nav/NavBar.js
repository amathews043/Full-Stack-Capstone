import { useNavigate } from "react-router-dom"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import "./navbar.css"
import Switch from '@mui/material/Switch';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export const NavBar = ({toggleTheme, toggle}) => {
    const navigate = useNavigate()

    return (
        // <nav className="navbar is-link is-spaced">
        //     <Link id="brand" className="navbar-brand " to="/">
        //         {/* <img className="image is-2by logo" src={logo} alt="logo"/> */}
        //         Home
        //     </Link>
        //     <div className="navbar-end navbar__logout">
        //         <Button className="navbar__link button is-light" to="" onClick={() => {
        //             localStorage.removeItem("token")
        //             navigate("/login", { replace: true })
        //         }}> Logout
        // //         </Button>
        //     </div>
        // </nav>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <div className="navbar-left">
                    <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
                    <Button color="inherit" onClick={() => navigate("/projectList")}>Projects</Button>
                    <Button color="inherit" onClick={() => navigate("/myProfile")}>Profile</Button>
                    </div>
                    <div> { toggle ? <DarkModeIcon/> : <LightModeIcon />
                        
                        }
                    <Switch onClick={toggleTheme} />
                    </div>
                    <Button color="inherit" onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/login", { replace: true })
                    }}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}