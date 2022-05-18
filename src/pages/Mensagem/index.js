import { useState, useEffect, useContext } from "react";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";
import { useParams } from "react-router-dom";



export function Mensagem() {
    const context = useContext(AuthContext)
    const params = useParams();

    console.log(params.jobId)
    const {loggedInUser} = context
    
   
    const [texto, setTexto] = useState({
        msg: "",
        name: loggedInUser.user.name,
        jobs: params.jobId
    })

   // const [idMsg, setIdMsg] = useState({
     //   msg:""
    //})
    //console.log(texto)
    const [allTexto, setAllTexto] = useState([])
    const [sent, setSent] = useState(false)

    
    useEffect(() => {
        async function fetchAllTexto() {
            const response = await api.get("/messages/all-msg");
            console.log(response.data);
            setAllTexto([...response.data])
          
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
   function handleChange(e) {
    setTexto({ ...texto, [e.target.name]: e.target.value });
    console.log(texto)
  }
//console.log(loggedInUser)
async function handleSubmit(e) {
e.preventDefault();

setSent(true)


try {
 await api.post("/messages/new-msg", { ...texto});
 //await api.post("/jobs/create-job", { ...idMsg});
    
 
} catch (error) {
  console.log(error);
}
}

console.log(msgfiltrada)
    return (
        <div>
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
                            
                        })
                          
                    )
                })}
                    
                </ul>
            </div>

            
        </div>
    )
}