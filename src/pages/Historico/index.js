import {Link, useNavigate } from "react-router-dom";
import {api} from "../../api/api";
import { useEffect, useState, useContext } from "react";
import Patch from "../Assets/images/patch.png";
import { AuthContext } from "../../contexts/authContext";
import styled from "styled-components"
import Historic1 from "../Assets/images/historic1.png"
import Historic2 from "../Assets/images/historic2.png"



export function Historico() {

    const [profile, setProfile] = useState([{}]);

    const [isLoad, setIsLoad] = useState(true);


    const navigate = useNavigate();

    

    const { loggedInUser } = useContext(AuthContext);

    

    useEffect (() => {
    
        async function fetchProfile() {
            const response = await api.get("/user/profile")
            setProfile({...response.data})
            setIsLoad(false);
        }
        fetchProfile()
    }, [])



   console.log(profile)

    return ( 
        <>

        <SHeader>
            <Link to="/profile"><img src={ Patch } alt="" /></Link>
            <h1>YOUR HISTORIC</h1>
            <img src={loggedInUser.user.img} alt="imagem de perfil"/>
        </SHeader>

        <SContainer>
             
            <SCard1>
                
                <div className="card1">
                    <SImg src={Historic1} alt=""/>
                        <div className="text1">
                            <h1>FIND A WORKER</h1>
                        </div>
                </div>
            

                {!isLoad &&
            <>
            {
                        profile.jobs.map((currentProfile) => {

                            const {title, _id} = currentProfile;
                            return ( 
                                <div>

                                <ul>
                                <Link to={`/Mensagem/${_id}`}> <li className="lista1">{title}</li></Link>
                                </ul> 

                                <div>


                                </div>

                                {/* <div>
                                    <h2>{local}</h2>
                                    <h2>{prazo}</h2>
                                </div> */}
                                
                                </div>
                                
                            );
                        })

                    }

                </>
                }
            </SCard1> 
            
            <SCard2>

                <div className="card2">
                    <SImg src={Historic2} alt=""/>
                        <div className="text2">
                            <h1>FIND A WORK</h1>
                        </div>
                </div>

                {!isLoad &&
            <>
            {
                        profile.jobs.map((currentProfile) => {

                            const {title, _id} = currentProfile;
                            return ( 
                                <div>

                                <ul>
                                <Link to={`/Mensagem/${_id}`}> <li className="lista2">{title}</li></Link>
                                </ul> 

                                <div>


                                </div>

                                {/* <div>
                                    <h2>{local}</h2>
                                    <h2>{prazo}</h2>

                                    <Link to={`/jobEdit/${_id}`}>Edit Job</Link>
                                    <Link to={`/jobDelete/${_id}`}>Delete Job</Link>
                                </div> 

                                </div> */}
                                
                                </div>
                                

                            );
                        })

                    }

                </>
                }


            </SCard2>

        </SContainer>
        
        </>
     );



}

export default Historico;


// =========================== STYLES ============================= //

const SHeader = styled.div`
display: flex;
justify-content: space-between;

& img {
  width: 290px;
  margin-top: -58px;
}

& h1 {
  font-size: 60px;
  color: #F5F5F5;
  font-family: "Montserrat";
  text-transform: uppercase;
  font-style: italic;
  letter-spacing: -3px;
  margin-bottom: -5px;
  align-items: center;
  margin-top: 10px;
  text-align:center;
}
`;

const SContainer = styled.div`

display: flex;
justify-content: space-evenly;
`;

const SCard1 = styled.div`
display: flex;
flex-direction: column;
//justify-content: space-evenly;
margin-top: 35px;


& .lista1 {
    margin-top: 10px;
    list-style-type: none;
    color: white;
    text-decoration: none;
    font-family: "Montserrat";
}

& .card1 {
  border-radius: 10px;
  margin-left: 4px;
  color: #F5F5F5;
  box-shadow: 10px 11px 18px black;
  
  & h1 {
    font-family: "Montserrat";
    letter-spacing: -2px;
    font-style: italic;
    width: 240px;
    font-size: 40px;
    text-align: center; 
  }

  & .text1 {
    position: absolute;
    bottom: 200px;
    //text-align:center;
    margin-left: 30px;
  }
}`;

const SCard2 = styled.div`
display: flex;
flex-direction: column;
//justify-content: space-evenly;
margin-top: 35px;


& .lista2 {
    margin-top: 10px;
    list-style-type: none;
    color: white;
    text-decoration: none;
    font-family: "Montserrat";
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
        width: 240px;
        font-size: 40px;
        text-align: center; 
    }

    & .text2 {
        position: absolute;
        bottom: 200px;
        //text-align:center;
        margin-left: 30px;
    }
    }`;

const SImg = styled.img`
    width: 300px;
    height: 120px;
    border-radius: 10px;
    position: relative;
    margin-bottom: -4px;

`;