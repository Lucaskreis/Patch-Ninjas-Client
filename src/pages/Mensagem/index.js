import { useState, useEffect, useContext } from "react";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import Patch from "../Assets/images/patch.png";
import Enviar from "../Assets/images/button.png"
import styled from "styled-components"
import WD from "../Assets/images/card1.png"
import UXUI from "../Assets/images/card2.png"
import DI from "../Assets/images/card3.png"
import Fav from "../Assets/images/favicon.png"



export function Mensagem() {
    const context = useContext(AuthContext)
    const params = useParams();
    const navigate = useNavigate();

    //console.log(params.jobId)
    const {loggedInUser} = context
    const [fav, setFav] = useState([]);
    const [texto, setTexto] = useState({
        msg: "",
        name: loggedInUser.user.name,
        jobs: params.jobId
    });
    

    const [allTexto, setAllTexto] = useState([])
    const [sent, setSent] = useState(false)


   
    useEffect(() => {
        async function fetchAllTexto() {
            const response = await api.get("/messages/all-msg");
           
            setAllTexto([...response.data]);
        }
        
        fetchAllTexto()
        setSent(false)
    },[sent])  
    
   const msgfiltrada = allTexto.filter((elemento) => {
    if(elemento._id === params.jobId ){
      
               return elemento;
         }
        
   })
   
   const jobOwner = msgfiltrada.map((element) => {
       return (element.user)
   }).map((id) => {
       return (id._id)
   })
 
  
   function handleChange(e) {
    setTexto({ ...texto, [e.target.name]: e.target.value });
  }

    async function handleSubmit(e) {
    e.preventDefault();
    setSent(true)
    try {
    await api.post("/messages/new-msg", { ...texto});
        
    } catch (error) {
    console.log(error);
    }}

    const telefone = allTexto.filter((job) => {
        if(job._id === params.jobId ){
            return(job)
        }
    })
   
    const phone = telefone.map((item) => {
        return (item.user.phone)
    })


    function deleteJob() {
        api.delete(`/jobs/delete-job/${params.jobId}`)
        navigate("/Profile");
        return
    }
    
    function editJob(){
        navigate(`/jobEdit/${params.jobId}`)
    }

    async function favoritos(){
       const response = await api.get("/user/profile");
        console.log(response.data.isFav)
       setFav([...response.data.isFav])
        console.log(fav)
       if(fav.includes(params.jobId)){
           return 
       }
       await api.patch("/user/update-profile", {isFav: params.jobId} );
       //funcionando, mas sempre substitui o item e não adiciona outro
       console.log(fav)
    }

    return (
        <div>
            <SHeader>
                <Link to="/profile"><img src={ Patch } alt="" /></Link>
                <h1>MESSAGES</h1>
            </SHeader>

            <SContainer>

                <div>
                    
                    {msgfiltrada.map((item) =>{
                        return(

                            <SCard>
                                { item.tags.includes("WD") ? <img src={WD} alt=""/> : null }
                                { item.tags.includes("UXUI") ? <img  src={UXUI} alt=""/> : null }
                                { item.tags.includes("DI") ? <img  src={DI} alt=""/> : null }

                                <div className="title"><h1>{item.title}</h1></div>
                                        <div className="infos">
                                            <h3>Local: <span>{item.local}</span></h3>
                                            <h3>Terms: <span>{item.prazo}</span></h3>
                                            <h3>Type:  <span>{item.tags}</span></h3>
                                        </div>
                                    <h3>Description: <span>{item.description}</span></h3>

                                    <SFavBtn>
                                        <button className="favBtn" onClick={favoritos}>
                                            <img className="favicon" src={Fav}/>
                                        </button>
                                        <div className="button2">
                                            <button>
                                                <a target="blank" href={`https://api.whatsapp.com/send?1=pt_BR&phone=55${phone.toString()}`}> Go to WhatsApp</a>
                                         </button>
                                        </div>
                                    </SFavBtn>

                                        {jobOwner.toString() === loggedInUser.user._id ? 
                                        (<div className="ownerBtn">
                                            <button  onClick={deleteJob}>Delete Job</button>
                                            <button onClick={editJob}>Edit Job</button>
                                        </div>) : null}
                            </SCard>

                        )     
                    })}
                        

                </div>

                
                <SChat>

                    <div>

                        {msgfiltrada.map((item) =>{
                            console.log(item)

                            
                            return( item.msg.map((element) => {
                                console.log(element)
                                return(
                                    
                                    
                                    loggedInUser.user._id === element.user ? 
                                    
                                    (<SRight>
                                        {/* <h3> {element.name} </h3> */}
                                        <h1> {element.msg}  </h1>
                                    </SRight>)
                                    : 
                                    (<SLeft>
                                        <h3> {element.name} </h3>
                                        <h1> {element.msg}  </h1>
                                    </SLeft>)

                                


                                    
                                )
                                
                            }))
                    })}   
                    
                    </div>

                    <form onSubmit={handleSubmit}>
                    
                    <SButton>
                    <input
                        name="msg"
                        type="text"
                        value={texto.msg}
                        onChange={handleChange}
                        placeholder="Type your message.."
                    />
                        <button type="submit"><img src={Enviar} alt=""/></button>
                    </SButton>
                    </form>

                </SChat>
            </SContainer>           
            
        </div>
    )
};

export default Mensagem;

// =========================== STYLES ============================= // 

const SContainer = styled.div`
display:flex;
justify-content: space-between;
padding: 10px;
margin-top: -50px;

& img {
    width: 35px;
    
}

& button {
    background-color: transparent;
    border-radius: 300px;
    border: 1px solid transparent;
    cursor: pointer;
}
`

const SButton = styled.div`
display:flex;
margin-top: 440px;

& img {
    width: 50px;
}

& input {
    border-radius: 20px;
    width: 850px;
    background-color: white;
    border: 1px solid white;
    padding: 10px;
    height: 30px;

    ::placeholder {
        font-size: 19px;
        font-style: italic;
    }

}


`

const SHeader = styled.div`
display: flex;
gap: 260px;
//justify-content: space-around;

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
  margin-top: 50px;
  text-align:center;
}
`;


const SCard = styled.div`
border: 1px solid #839FDD;
border-radius: 15px;
padding: 10px;
width: 300px;
height: auto;
background-color: #839FDD;

& .ownerBtn{
    margin-left:50px;
}

& h3 {
    font-size: 20px;
    font-family: "Montserrat";
    color: white;
    text-align: center;
    }

    & span {
    font-weight: 200;
    font-size: 15px;
    font-family: "Montserrat";
}

& img {
    border-radius: 90px;
    width: 180px;
    margin-left: 60px;
    border: 2px solid black;
    box-shadow: 5px 5px 15px black;
}


& .title {
    margin-top: -20px;
    font-family: "Montserrat";
    color: white;
    font-size: 20px;
    text-align: center;
    line-height: 35px;

}

& .infos {
    line-height: 5px;
    font-family: "Montserrat";
    color: white;
    text-align: center;
    
    
    & h3 {
        font-size: 20px
    }

    & span {
    font-weight: 200;
    font-size: 15px
}}

& button {

    border: 1px solid #0246B7;
    border-radius: 5px;
    padding: 5px 10px;
    margin-top: 20px;
    background-color: #0246B7;
    font-family: "Montserrat";
    font-style: oblique;
    font-size: 15px;
    cursor: pointer;
    color: white;
    margin-left: 5px;
    
}

& a {
    text-decoration: none;
    color: white;
}
`

const SLeft = styled.div`
border: 1px solid whitesmoke;
border-radius: 25px;
margin-bottom: 10px;
background-color: whitesmoke;
line-height: 10px;
text-align: left;
//width: fit-content;
padding-left: 20px;
padding-right: 10px;
padding-bottom: 5px;
margin-right: 70%;



& h3 {
    font-family: 'Montserrat';
    font-style: italic;
    font-weight: 600;
    color: #FF5757;
    
    
}

& h1 {
    color: black;
    font-family: "Montserrat";
    font-size: 15px;
    margin-top: -5px;
}

`

const SRight = styled.div`
border: 1px solid #C8E6BA;
border-radius: 25px;
margin-bottom: 10px;
background-color: #C8E6BA;
line-height: 20px;
text-align: right;
//width: fit-content;
margin-left: 70%;
padding: 8px;
padding-right: 20px;



& h3 {
    
    font-family: 'Montserrat';
    font-style: italic;
    font-weight: 600;
    color: black;
    text-transform: uppercase;
    
}

& h1 {
    color: black;
    font-family: 'Montserrat';
    font-size: 15px;
    margin-top: 5px;
    
}

`;

const SChat = styled.div`
border-radius: 20px;
padding: 25px;
width: auto;
height: auto;
background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");`




const SFavBtn = styled.div`
display: flex;
margin-left: -28px ;

& .favicon {
    width: 40px;
    border: none;
    box-shadow: none;
    margin-top: -30px
    
}

& .favBtn {
    background-color: transparent;
    border: none;
    margin-top: 35px;
}

& .button2 {
    margin-top: -1px;
}

`