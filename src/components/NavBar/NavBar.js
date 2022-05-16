import "./Navbar.css"
import { Link, useNavigate } from "react-router-dom";

export function NavBar(props) {
    const navigate = useNavigate()
    function handleSubmit(e){
        e.preventDefault();
        navigate("/login")
    }
    
    
    return ( 
        <div className="navBar">
            <Link to="/"><img src={""} alt="logo" className="logo"></img></Link>
            <div className="rigthSection">
                <Link to="/signup" ><span className="link">CADASTRE-SE</span></Link>
                <Link to="/comoFunciona"><span  className="link">ENTENDA COMO FUNCIONA !</span></Link>
            </div>
        </div>

    
     );
}

