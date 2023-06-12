import { Link, useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <nav className="navbar is-link is-spaced"> 
           <Link id="brand" className="navbar-brand " to="/"> 
           {/* <img className="image is-2by logo" src={logo} alt="logo"/> */}
                Home 
            </Link>
            <Link className="navbar-item" to="/projectList">
                Projects
             </Link>
             <Link className="navbar-item" to="/myProfile">
                Profile
             </Link>
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