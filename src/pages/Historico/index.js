import {Link} from "react-router-dom";
import {api} from "../../api/api";
import { useEffect, useState, useContext } from "react";
import Patch from "../Assets/images/patch.png";
import { AuthContext } from "../../contexts/authContext";
import styled from "styled-components"




export function Historico() {

    const [profile, setProfile] = useState([{}]);
    const [favorites, setFav] = useState([]);
    console.log(favorites);
    const [isLoad, setIsLoad] = useState(true);
    const { loggedInUser } = useContext(AuthContext);

    useEffect (() => {
    
        async function fetchProfile() {
            const response = await api.get("/user/profile")
            setProfile({...response.data})
            setIsLoad(false);   
        }
        fetchProfile()
    }, [])
    
    useEffect (() => {

        async function fetchFav() {
            const response = await api.get("/user/profile")
            console.log(response.data.isFav)
            setFav([...response.data.isFav])
            ;
        }
        fetchFav();
    }, []);

    console.log(favorites)

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
                
                <div>
                    <h1>YOU POSTED</h1>
                </div>
  
                {!isLoad &&
                <>
                    {profile.jobs.map((currentProfile) => {

                        const {title, _id} = currentProfile;
                            return ( 
                                <div>
                                    <Link to={`/Mensagem/${_id}`}> <h4>{title}</h4></Link>
                                </div>  
                            );
                        })}
                    </>
                }
            </SCard1> 
            
            <SCard2>

                <div>
                    <h1>YOUR FAVORITES</h1>
                </div>

                <ul>
                {!isLoad &&
                    <>
                    {favorites.map((currentProfile) => {
                            console.log(currentProfile)
                            return ( 
                                <div>
                                    <Link to={`/Mensagem/${currentProfile._id}`} ><h4>{currentProfile.title}</h4></Link>
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
justify-content: center;
gap: 50px;

`;

const SCard1 = styled.div`
display: flex;
flex-direction: column;
margin-top: 35px;
width: auto;
height: auto;
padding: 10px;
border-radius: 15px;
box-shadow: 5px 5px 10px black;
background: linear-gradient(180deg, #fdcd3b 50%, #ffed4b 60%);

& h1 {
font-family: "Montserrat";
color: white;
text-shadow: 2px 2px 12px black;
font-style: italic;
font-size: 40px;
text-align: center;



}

& a{
 text-decoration: none;
}

& h4 {
        color : black;
        font-family: "Montserrat";
        font-weight: 600;
        text-align: center;
        font-style: italic;
    }

`;

const SCard2 = styled.div`
display: flex;
flex-direction: column;
margin-top: 35px;
width: auto;
height: auto;
padding: 10px;
border-radius: 15px;
box-shadow: 5px 5px 10px black;
background: linear-gradient(180deg, #fdcd3b 50%, #ffed4b 60%);

& h1 {
    margin-bottom: 3px;
    font-family: "Montserrat";
    color: white;
    text-shadow: 2px 2px 12px black;
    font-size: 40px;
    font-style: italic;
}

& a { 
    text-decoration: none;
}

& h4 {
    color : black;
    font-family: "Montserrat";
    font-weight: 600;
    text-align: center;
    font-style: italic;
    margin-right: 28px;
    }

`;

const SPhoto = styled.div`
& img {
    width: 150px;
    margin-top: 10px;
    margin-right: 35px;
}

`