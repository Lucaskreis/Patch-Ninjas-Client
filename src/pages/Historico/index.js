import {Link} from "react-router-dom";
import {api} from "../../api/api";
import { useEffect, useState, useContext } from "react";
import Patch from "../Assets/images/patch.png";
import { AuthContext } from "../../contexts/authContext";
import styled from "styled-components"
import Historic1 from "../Assets/images/historic1.png"
import Historic2 from "../Assets/images/historic2.png"



export function Historico() {

    const [profile, setProfile] = useState([{}]);
    const [messages, setMessages] = useState([]);
    console.log(messages);
    const [isLoad, setIsLoad] = useState(true);
    const { loggedInUser } = useContext(AuthContext);
    //console.log(loggedInUser);

    useEffect (() => {
    
        async function fetchProfile() {
            const response = await api.get("/user/profile")
            setProfile({...response.data})
            setIsLoad(false);   
        }
        fetchProfile()
    }, [])
    
    useEffect (() => {

        async function fetchMessage() {
            const response = await api.get("/messages/user-msg")
            console.log(response)
            setMessages([...response.data])
            ;
        }
        fetchMessage();
    }, []);

    console.log(messages)
     const userMessages = messages.map((elemento) => {
        console.log(elemento.msg.user)
        console.log(loggedInUser.user._id)
        if (elemento._id === loggedInUser.user._id ) {
            return elemento.msg;
        }});

   console.log(userMessages);

    return ( 
        <>

        <SHeader>
            <Link to="/profile"><img src={ Patch } alt="" /></Link>
            <h1>YOUR HISTORIC</h1>
            <SPhoto>
                <img src={loggedInUser.user.img} alt="imagem de perfil"/>
            </SPhoto>
        </SHeader>

        <SContainer>
             
            <SCard1>
                
                <div className="card1">
                    <SImg src={Historic1} alt=""/>
                        <div className="text1">
                            <h1>YOU POSTED</h1>
                        </div>
                </div>
  
                {!isLoad &&
                <>
                    {profile.jobs.map((currentProfile) => {

                        const {title, _id} = currentProfile;
                            return ( 
                                <div>
                                    <ul>
                                        <Link to={`/Mensagem/${_id}`}> <li className="lista1">{title}</li></Link>
                                    </ul> 

                                </div>  
                            );
                        })}
                    </>
                }
            </SCard1> 
            
            <SCard2>

                <div className="card2">
                    <SImg src={Historic2} alt=""/>
                        <div className="text2">
                            <h1>YOU ASKED</h1>
                        </div>
                </div>

                <ul>
                {!isLoad &&
            <>
            {
                        userMessages.map((currentMessage) => {
                            const {title, _id} = currentMessage;
                            return ( 

                                <div>
                                    <Link to={`/Mensagem/${_id}`}> <li className="lista2">{title}</li></Link>
                                </div>
                            );
                        })}
                </>
                }
                </ul>

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

& a{
 text-decoration: none;
}


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
        bottom: 225px;
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

const SPhoto = styled.div`
& img {
    width: 150px;
    margin-top: 10px;
    margin-right: 35px;
}

`