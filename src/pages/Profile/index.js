import { useEffect, useState, useContext } from "react";
import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

//import { motion } from "framer-motion"
import styled from "styled-components"
import Ninja from "../Assets/images/patch.png"
import Card1 from "../Assets/images/card1.png"
import Card2 from "../Assets/images/card2.png"
import Card3 from "../Assets/images/card3.png"




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

console.log(loggedInUser);

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
          <div>
            <img src={Ninja} alt={loggedInUser.user.name} />
          </div>
            <SName>
              <h1>{loggedInUser.user.name}</h1>
              <button onClick={handleEdit}>Editar Perfil</button>
              <button onClick={handleLogOut}>Sair</button>
            </SName>
          <div>
            <img className="photo" src={loggedInUser.user.img} alt="imagem de perfil"/> 
          </div>
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
        
      <Link to="/createjob">  <div className="card1">
          <SImg src={Card1} alt=""/>
           <div className="text1">
              <h1>FIND A WORKER</h1>
              <button>Ask a Work</button>
            </div>
            
          </div></Link>

          <div className="card2">
            <SImg src={Card2} alt=""/>
            <div className="text2">
              <h1>FIND A WORK</h1>
              <Link to="/dashboard"><button>See Works</button></Link>
            </div>
          </div>

          <div className="card3">
            <SImg src={Card3} alt=""/>
            <div className="text3">
              <h1>YOUR HISTORIC</h1>
              <Link to="/historico"><button>See Historic</button></Link>
            </div>
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

& .photo {
  border-radius: 200px;
  width: 150px;
  margin-top: 10px;
  margin-right: 5px;
}

& img {
  width: 290px;
  margin-top: -58px;
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
  border-radius: 10px;
  margin-left: 4px;
  color: #F5F5F5;
  box-shadow: 10px 11px 18px black;
  
  
  
  & h1 {
    font-family: "Montserrat";
    letter-spacing: -2px;
    font-style: italic;
    width: 230px;
    font-size: 50px;
    text-align: center;
    
  }

  & button {
    border: 1px solid #D9D9D9;
    border-radius: 20px;
    padding: 10px 25px;
    background-color: #D9D9D9;
    color:#5D5E5F;
    font-family: "Montserrat";
    font-style: oblique;
    cursor: pointer;
    margin-left: 30px;
    font-size: 20px;
    
  }

  & .text1 {
    position: absolute;
    bottom: 92px;
    //text-align:center;
    margin-left: 30px;
  }
}

& .card2 {
  border-radius: 10px;
  margin-left: 4px;
  color: #F5F5F5;
  box-shadow: 10px 11px 18px black;

  & h1 {
    font-family: "Montserrat";
    letter-spacing: -2px;
    font-style: italic;
    width: 230px;
    font-size: 50px;
    text-align: center;
  }

  & button {
    border: 1px solid #D9D9D9;
    border-radius: 20px;
    padding: 10px 25px;
    background-color: #D9D9D9;
    color:#5D5E5F;
    font-family: "Montserrat";
    font-style: oblique;
    cursor: pointer;
    margin-left: 30px;
    font-size: 20px;
  }
  & .text2 {
    position: absolute;
    bottom: 92px;
    //text-align:center;
    margin-left: 30px;
  }
}

& .card3 {
  border-radius: 10px;
  margin-left: 4px;
  color: #F5F5F5;
  box-shadow: 10px 11px 18px black;

  & h1 {
    font-family: "Montserrat";
    letter-spacing: -2px;
    font-style: italic;
    width: 230px;
    font-size: 50px;
    text-align: center;
  }

  & button {
    border: 1px solid #D9D9D9;
    border-radius: 20px;
    padding: 10px 25px;
    background-color: #D9D9D9;
    color:#5D5E5F;
    font-family: "Montserrat";
    font-style: oblique;
    cursor: pointer;
    margin-left: 30px;
    font-size: 20px;
  }
  & .text3 {
    position: absolute;
    bottom: 92px;
    //text-align:center;
    margin-left: 30px;
  }
}
`;


const SImg = styled.img`
    width: 300px;
    border-radius: 10px;
    position: relative;
    margin-bottom: -4px;

`;
