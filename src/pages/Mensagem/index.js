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
    
   
    const [texto, setTexto] = useState({
        msg: "",
        name: loggedInUser.user.name,
        jobs: params.jobId
    })

    const [allTexto, setAllTexto] = useState([])
    const [sent, setSent] = useState(false)


    
    useEffect(() => {
        async function fetchAllTexto() {
            const response = await api.get("/messages/all-msg");
           
            setAllTexto([...response.data]);
           
           /* const spreadData = [...response.data];
            const filteredMsgsporJobs = spreadData.filter((element) => {
                if(element._id === params.jobId){
                    return(element)
                }

            });
            console.log(filteredMsgsporJobs)

            console.log(loggedInUser.user._id)
            const filteredMsgsporUser = filteredMsgsporJobs.map((mapElement) => {
            return (mapElement)}).filter((element) => {
                console.log(element.msg)
                console.log(element.msg.user)
                console.log(loggedInUser.user._id)
                console.log(filteredMsgsporJobs.user)
                if(element.msg.user === loggedInUser.user._id || element.msg.user === filteredMsgsporJobs.user ){
                console.log(element)
                return (element)
         } })
            
          
            console.log(filteredMsgsporUser)*/
        }
        
        fetchAllTexto()
        setSent(false)
    },[sent])  
    
 
   const msgfiltrada = allTexto.filter((elemento) => {
    if(elemento._id === params.jobId ){
       
           //console.log(elemento)

               return elemento;
         }
        
   })
   //console.log(msgfiltrada)
   const jobOwner = msgfiltrada.map((element) => {
       return (element.user)
   }).map((id) => {
       return (id._id)
   })
   console.log(jobOwner.toString())
   console.log(loggedInUser.user._id)
   function handleChange(e) {
    setTexto({ ...texto, [e.target.name]: e.target.value });
    //console.log(texto)
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
    //console.log(phone)
    const link = `https://api.whatsapp.com/send?1=pt_BR&phone=55${phone.toString()}`
    //console.log(link)

    function deleteJob() {
        api.delete(`/jobs/delete-job/${params.jobId}`)
        navigate("/Profile");
        return
    }
    function editJob(){
        navigate(`/jobEdit/${params.jobId}`)
    }
    //console.log(texto)

//console.log(userMsg)

    return (
        <div>
            <SHeader>
                <Link to="/profile"><img src={ Patch } alt="" /></Link>
                <h1>MESSAGES</h1>
            </SHeader>

            <SContainer>
                <div>
                    <ul>
                        {msgfiltrada.map((item) =>{
                            console.log(item)
                            return(
                                <SCard>
                                    <div className="title"><h1>{item.title}</h1></div>
                                    <div className="infos">
                                        <h3>Local: <span>{item.local}</span></h3>
                                        <h3>Terms: <span>{item.prazo}</span></h3>
                                        <h3>Type:  <span>{item.tags}</span></h3>
                                    </div>
                                    <button  className="button2"><a target="blank" href={`https://api.whatsapp.com/send?1=pt_BR&phone=55${phone.toString()}`}> Go to WhatsApp</a></button>

                                    {jobOwner.toString() === loggedInUser.user._id ? 
                                    (<div>
                                        <button  onClick={deleteJob}>Delete Job</button>
                                        <button onClick={editJob}>Edit Job</button>
                                    </div>) : null}
                                </SCard>
                            )     
                    })}
                        
                    </ul>
                </div>

                
                <div>
                    
                    
                        {msgfiltrada.map((item) =>{
                            console.log(item)
                            
                            return( item.msg.map((element) => {
                                console.log(element)
                                return(
                                    
                                    
                                    loggedInUser.user._id === element.user ? 
                                    
                                    (<SLeft>
                                        <h1>{element.name}: {element.msg}</h1>
                                    </SLeft>)
                                    : 
                                    (<div>
                                        {element.name}: {element.msg}
                                    </div>)

                                    


                                    
                                )
                                
                            }))
                    })}   
                    

                    <form onSubmit={handleSubmit}>
                    
                    <SButton>
                    <input
                        name="msg"
                        type="text"
                        value={texto.msg}
                        onChange={handleChange}
                    />
                        <button type="submit"><img src={Enviar} alt=""/></button>
                    </SButton>
                    </form>

                </div>
            </SContainer>           
            
        </div>
    )
};

export default Mensagem;

// =========================== STYLES ============================= // 

const SContainer = styled.div`
display:flex;
justify-content: space-between;

& img {
    width: 35px;
    
}

& button {
    background-color: transparent;
    border-radius: 300px;
    border: 1px solid #253D71;
    cursor: pointer;
}
`

const SButton = styled.div`
display:flex;`

const SHeader = styled.div`
display: flex;
gap: 150px;
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
  margin-top: 10px;
  text-align:center;
}
`;


const SCard = styled.div`
border: 1px solid #839FDD;
border-radius: 15px;
padding: 10px;
width: 300px;
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
    
}

& a {
    text-decoration: none;
    color: white;
}
`

const SLeft = styled.div`
background-color: red;

& h1 {
    color: white;
}

`