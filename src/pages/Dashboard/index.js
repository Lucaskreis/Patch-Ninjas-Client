import {Link } from "react-router-dom";
import {api} from "../../api/api";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import styled from "styled-components"
import Logo from "../Assets/images/patch.png"
import WD from "../Assets/images/card1.png"
import UXUI from "../Assets/images/card2.png"
import DI from "../Assets/images/card3.png"

export function Dashboard() {

    const [vagas, setVagas] = useState([]);

    const Context = useContext(AuthContext);
    const { loggedInUser } = useContext(AuthContext);
    console.log(Context);

    useEffect (() => {
    
        async function fetchVagas() {
            const response = await api.get("/jobs/jobs")
            setVagas(response.data)
            console.log(response.data)
        }
        fetchVagas()
    }, [])

    
    const filteredVagas = vagas.filter((elemento) => {
        if(elemento.user !== Context.loggedInUser.user._id) {
            return elemento;
        }  
    });


    return ( 
        <SContainer>

            <SHeader>
                <div>
                <Link to="/profile"><img src={Logo} alt=""></img></Link>
                </div>

                <div>
                    <h1>FIND A WORK</h1>
                </div>

                <SPhoto>
                    <img src={loggedInUser.user.img} alt=""></img>
                </SPhoto>
            </SHeader>


            <div className="card">
                    {
                        filteredVagas.map((currentVagas) => {

                            const {title, local, prazo, _id, tags} = currentVagas;
                        return ( 
                            <>

                                <Link to={`/Mensagem/${_id}`}> 
                                    <SCard>
                                        { tags.includes("WD") ? <SImg src={WD} alt=""/> : null }
                                        { tags.includes("UXUI") ? <SImg src={UXUI} alt=""/> : null }
                                        { tags.includes("DI") ? <SImg src={DI} alt=""/> : null }
                                        <div className="dashboard">
                                            <h1>{title}</h1>
                                            <h3>{local}</h3>
                                            <h4>{prazo}</h4>
                                        </div>
                                    </SCard>
                                </Link>

                            </>
                        );
                        })

                    }

            </div>
        </SContainer>
    

     );
}

export default Dashboard;


// =========================== STYLES ============================= // 

const SContainer = styled.div`

& .card {
    display: grid ;
    grid-template-columns: auto auto auto;
    justify-content: center;
    gap: 50px;
}

& a {
        text-decoration: none;
        color:#253D71;
    }
`

const SCard = styled.div`

    border-radius: 10px;
    margin-left: 4px;
    color: #F5F5F5;
    box-shadow: 10px 11px 18px black;
    margin-top: 20px;
    height: 300px;
    width: 300px;
    
    & h1 {
    font-family: "Montserrat";
    letter-spacing: -1px;
    font-style: italic;
    width: 290px;
    font-size: 30px;
    text-align: center;
    padding-top: 75px;
    }
    
    & h3 {
        font-family: "Montserrat";
        letter-spacing: -1px;
        font-style: italic;
        width: 290px;
        font-size: 20px;
        text-align: center;
    }

    & h4 {
        font-family: "Montserrat";
        letter-spacing: 3px;
        font-style: italic;
        width: 290px;
        font-size: 10px;
        text-align: center;
    }

    & .dashboard {
        position: absolute;
        bottom: 98px;
        margin-left: 5px;
    }
`;

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
}
`;


const SPhoto = styled.div`

& img {
    width: 150px;
    margin-top: 10px;
    margin-right: 35px;
}
`

const SImg = styled.img`
    width: 300px;
    border-radius: 10px;
    position: relative;
    margin-bottom: -4px;

`
