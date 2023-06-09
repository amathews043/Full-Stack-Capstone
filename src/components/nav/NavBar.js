import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <nav className="navbar is-link is-spaced"> 
           <Link id="brand" className="navbar-brand " to="/"> 
           {/* <img className="image is-2by logo" src={logo} alt="logo"/> */}
            </Link>
            <div className="navbar-start">
            <Link className="navbar-item" id="white" to="/projectList">
                Projects
             </Link>
             <Link className="navbar-item" id="white" to="/myProfile">
                Profile
             </Link>
             </div>
            <div className="navbar-end navbar__logout">
                <button className="navbar__link button is-light" to="" onClick={() => {
                    localStorage.removeItem("token")
                    navigate("/login", {replace: true})
                }}> Logout
                 </button>
            </div> 
        </nav>
    )
}