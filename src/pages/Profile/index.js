import { useEffect, useState, useContext } from "react";
import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import "./index.css"

export function Profile() {
  // const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();
  // useEffect(() => {
  //   async function fetchUser() {
  //     const response = await api.get("/user/profile");
  //     setUser(response.data);
  //   }

  //   fetchUser();
  // }, []);

  const { loggedInUser } = useContext(AuthContext);


  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  }


  return (
    <div className="mainContainer">
      <div className="perfil">
        <div className="menu" >
          <img src={loggedInUser.user.img} alt="imagem de perfil" className="profileImg"/>
          <h1>{loggedInUser.user.name}</h1>
        </div>  
        <div className="btnContainer">  
          <Link to="/userEdit"><button>Editar Perfil</button></Link>
          <button onClick={handleLogOut}>Sair</button>
        </div>
      </div>
      <div className="profileContainer">
        <div className="linksProfile">
        <Link to="/createjob"> <h1>O que você está precisando?</h1></Link>
          {/*  <button></button>*/}
        </div>
        <div className="linksProfile">
        <Link to="/dashboard"><h1>Veja o que estão precisando</h1></Link>
         {/* <button>Ver</button>*/}
        </div>
        <div className="linksProfile">
        <Link to="/historico"><h1>Histórico</h1></Link>
          {/*<button>Ver suas requisições</button>*/}
        </div>
      </div>
    </div>
  );
}
