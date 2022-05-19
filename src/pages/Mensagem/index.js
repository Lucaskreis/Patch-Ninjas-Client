import { useState, useEffect, useContext } from "react";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import Patch from "../Assets/images/patch.png";
import Enviar from "../Assets/images/button.png"
import styled from "styled-components"


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
 
   console.log(jobOwner.toString())
   console.log(loggedInUser.user._id)
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
                                <div className="title"><h1>{item.title}</h1></div>
                                    <div className="infos">
                                        <h3>Local: <span>{item.local}</span></h3>
                                        <h3>Terms: <span>{item.prazo}</span></h3>
                                        <h3>Type:  <span>{item.tags}</span></h3>
                                    </div>
                                <h3>{item.description}</h3>
                                <button onClick={favoritos}>Favoritos</button>
                                        <button  className="button2">
                                            <a target="blank" href={`https://api.whatsapp.com/send?1=pt_BR&phone=55${phone.toString()}`}> Go to WhatsApp</a>
                                        </button>

                                        {jobOwner.toString() === loggedInUser.user._id ? 
                                        (<div>
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
margin-top: 50px;

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
height: 470px;
background-color: #839FDD;

& .title {
    margin-top: -20px;
    font-family: "Montserrat";
    color: white;
    font-size: 12px
}

& .infos {
    line-height: 5px;
    font-family: "Montserrat";
    color: white;
    
    & h3 {
        font-size: 12px
    }

    & span {
    font-weight: 200;
    font-size: 12px
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
border: 1px solid white;
border-radius: 25px;
margin-bottom: 10px;
background-color: whitesmoke;
line-height: 10px;
text-align: left;
width: fit-content;
padding-left: 10px;
padding-right: 10px;
padding-bottom: 5px;



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
line-height: 10px;
text-align: right;
width: fit-content;
padding: 8px;



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
