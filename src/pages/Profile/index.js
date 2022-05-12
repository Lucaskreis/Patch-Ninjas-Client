import { useEffect, useState, useContext } from "react";
import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

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
    <div>
      <div>
        <img src={loggedInUser.user.img} alt="imagem de perfil"/>
        <h1>{loggedInUser.user.name}</h1>    
        <Link to="/edit"><button>Editar Perfil</button></Link>
        <button onClick={handleLogOut}>Sair</button>
      </div>
      <div>
        <div>
          <h1>O que você precisa?</h1>
          <Link to="/createjob"><button></button></Link>
        </div>
        <div>
          <h1>Veja o que estão precisando</h1>
          <Link to="/dashboard"><button>Ver</button></Link>
        </div>
        <div>
          <h1>Histórico</h1>
          <h2>card</h2>
        </div>
      </div>
    </div>
  );
}
