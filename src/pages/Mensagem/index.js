import { useState, useEffect, useContext } from "react";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";
import { useParams, useNavigate } from "react-router-dom";


export function Mensagem() {
    const context = useContext(AuthContext)
    const params = useParams();
    const navigate = useNavigate();

    console.log(params.jobId)
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
            console.log(response.data);
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
       
           console.log(elemento)

               return elemento;
         }
        
   })
   console.log(msgfiltrada)
   function handleChange(e) {
    setTexto({ ...texto, [e.target.name]: e.target.value });
    console.log(texto)
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
    console.log(telefone) 
    const phone = telefone.map((item) => {
        return (item.user.phone)
    })
    console.log(phone)
    const link = `https://api.whatsapp.com/send?1=pt_BR&phone=55${phone.toString()}`
    console.log(link)

    function deleteJob() {
        api.delete(`/jobs/delete-job/${params.jobId}`)
        navigate("/Profile");
        return
    }
    function editJob(){
        navigate(`/jobEdit/${params.jobId}`)
    }

    return (
        <div>
            <div>
                <ul>
                    {msgfiltrada.map((item) =>{
                        console.log(item)
                        return(
                            <div>
                                <h1>{item.title}</h1>
                                <h3>{item.local}</h3>
                                <h3>{item.prazo}</h3>
                                <h3>{item.tags}</h3>
                                <h3>{item.description}</h3>
                                <button  className="button2"><a target="_blank" href="http://api.whatsapp.com/send?1=pt_BR&phone=550000000000">WhatsApp</a></button>
                                <div>
                                    <button className="show" onClick={deleteJob}>Delete Job</button>
                                    <button onClick={editJob}>Edit Job</button>
                                </div>
                            </div>
                        )     
                })}
                    
                </ul>
            </div>

            <h1>Mensagens</h1>
            <form onSubmit={handleSubmit}>
            <input
                name="msg"
                type="text"
                value={texto.msg}
                onChange={handleChange}
            />
            <button type="submit" >Enviar</button>
            </form>
            <div>
                <ul>
                    {msgfiltrada.map((item) =>{
                        console.log(item)
                        return( item.msg.map((element) => {
                            return(
                                <>
                                    <li>{element.name}: {element.msg}</li>
                                </>
                            )
                            
                        }))
                })}   
                </ul>
            </div>

            
        </div>
    )
}