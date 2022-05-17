import {Link } from "react-router-dom";
import {api} from "../../api/api";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import styled from "styled-components"
import Logo from "../Assets/images/patch.png"



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

    const telefone = vagas

    return ( 
        <SContainer>

            <SHeader>
                <div>
                <Link to="/profile"><img src={Logo} alt=""></img></Link>
                </div>

                <div>
                    <h1>FIND A WORK</h1>
                </div>

                <div>
                    <img src={loggedInUser.user.img} alt=""></img>
                </div>
            </SHeader>


            <div className="card">
                    {
                        filteredVagas.map((currentVagas) => {

                            const {title, local, prazo, _id} = currentVagas;
                            return ( 
                                <>

                                <Link to={`/Mensagem/${_id}`}> <SCard>
                                <div>
                                        <h1>{title}</h1>
                                        <h3>{local}</h3>
                                        <h4>{prazo}</h4>
                                   
                                       
                                    </div>
                                </SCard></Link>

                                {/* <div>
                                    <h2>{local}</h2>
                                    <h2>{prazo}</h2>
                                </div> */}

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
    display: flex ;
    justify-content: space-evenly;
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
    text-align: center;
    align-items: center;

    & h1 {
    font-family: "Montserrat";
    letter-spacing: -1px;
    font-style: italic;
    width: 200px;
    font-size: 30px;
    text-align: center;
    margin-left: 50px;
    margin-top: 70px;
    }

    & .button1 {
        border-radius: 15px;
        border: 1px solid #D9D9D9;
        padding: 1px 25px;
        background-color: #D9D9D9;
        color:#5D5E5F;
        font-family: "Montserrat";
        font-style: oblique;
        font-size: 20px;
        margin-bottom: 7px;
    }

    & .button2 {
        border-radius: 15px;
        border: 1px solid #D9D9D9;
        padding: 1px 25px;
        background-color: #D9D9D9;
        color:#5D5E5F;
        font-family: "Montserrat";
        font-style: oblique;
        font-size: 20px;
        margin-bottom: 7px;
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
