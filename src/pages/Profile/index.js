import { useEffect, useState, useContext } from "react";
import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

//import { motion } from "framer-motion"
import styled from "styled-components"
import Ninja from "../Assets/images/patch.png"




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
  //const [selectedId, setSelectedId] = useState(null);


  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  }

  function handleEdit() {
    navigate("/userEdit")
  }

  return (

    <SContainer>

        <SHeader>
          <img src={Ninja} alt={loggedInUser.user.name} />
            <SName>
              <h1>{loggedInUser.user.name}</h1>
              <button onClick={handleEdit}>Editar Perfil</button>
              <button onClick={handleLogOut}>Sair</button>
            </SName>
          <img src={loggedInUser.user.img} alt="imagem de perfil"/> 
        </SHeader>

        {/* {items.map(item => (
          <motion.div layoutId={item.id} onClick={() => setSelectedId(item.id)}>
            <motion.h5>{item.subtitle}</motion.h5>
            <motion.h2>{item.title}</motion.h2>
          </motion.div>
      ))};

            <AnimatePresence>
                {selectedId && (
                  <motion.div layoutId={selectedId}>
                  <motion.h5>{item.subtitle}</motion.h5>
                  <motion.h2>{item.title}</motion.h2>
                  <motion.button onClick={() => setSelectedId(null)} />
                  </motion.div>
                    )}
            </AnimatePresence> */}

      <SCards>
        
          <div className="card1">
            <h1>FIND A WORKER</h1>
            <Link to="/createjob"><button>Ask a Work</button></Link>
          </div>

          <div className="card2">
            <h1>FIND A WORK</h1>
            <Link to="/dashboard"><button>See Works</button></Link>
          </div>

          <div className="card3">
            <h1>YOUR HISTORIC</h1>
            <Link to="/historico"><button>See Historic</button></Link>
          </div>

      </SCards>
    </SContainer>

  );
}

export default Profile;

// =========================== STYLES ============================= // 

 const SContainer = styled.div`
  background-color: #253D71;
  position: absolute;
  object-fit: cover;
  height: 99%;
  width: 99%;
  z-index: 0;

`;

const SHeader = styled.div`
display: flex;
justify-content: space-between;

& img {
  width: 290px;
  margin-top: -20px;
}
`;

const SName = styled.div`
text-align: center;


& h1 {
  font-size: 80px;
  color: #F5F5F5;
  font-family: "Montserrat";
  text-transform: uppercase;
  font-style: italic;
  letter-spacing: -3px;
  margin-bottom: -5px;
  align-items: center;
  margin-top: 10px;
  
} 

& button {
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    padding: 1px 25px;
    margin-left: 4px;
    margin-top: -60px;
    background-color: #D9D9D9;
    color:#5D5E5F;
    font-family: "Montserrat";
    font-style: oblique;
    cursor: pointer;
    
}
`;

const SCards = styled.div`
display: flex;
justify-content: space-evenly;
margin-top: 20px;

& .card1 {
  border: 1px solid white;
  border-radius: 10px;
  padding: 15px;
  margin-left: 4px;
  color: #F5F5F5;
  
  
  & h1 {
    font-family: "Montserrat";
    letter-spacing: -2px;
    font-style: italic;
    width: 200px;
    text-align: center;
  }

  & button {
    border: 1px solid #D9D9D9;
    border-radius: 20px;
    padding: 10px 25px;
    margin-left: 34px;
    margin-top: -10px;
    background-color: #D9D9D9;
    color:#5D5E5F;
    font-family: "Montserrat";
    font-style: oblique;
    cursor: pointer;
  }
}

& .card2 {
  border: 1px solid white;
  border-radius: 10px;
  padding: 15px;
  color: #F5F5F5;

  & h1 {
    font-family: "Montserrat";
    letter-spacing: -2px;
    font-style: italic;
    width: 200px;
    text-align: center;
  }

  & button {
    border: 1px solid #D9D9D9;
    border-radius: 20px;
    padding: 10px 25px;
    margin-left: 34px;
    margin-top: -10px;
    background-color: #D9D9D9;
    color:#5D5E5F;
    font-family: "Montserrat";
    font-style: oblique;
    cursor: pointer;
  }
}

& .card3 {
  border: 1px solid white;
  border-radius: 10px;
  padding: 15px;
  margin-right: 4px;
  color: #F5F5F5;

  & h1 {
    font-family: "Montserrat";
    letter-spacing: -2px;
    font-style: italic;
    width: 200px;
    text-align: center;
  }

  & button {
    border: 1px solid #D9D9D9;
    border-radius: 20px;
    padding: 10px 25px;
    margin-left: 34px;
    margin-top: -10px;
    background-color: #D9D9D9;
    color:#5D5E5F;
    font-family: "Montserrat";
    font-style: oblique;
    cursor: pointer;
  }
}
`;
