import { useState, useEffect, useContext } from "react";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";
import { useParams } from "react-router-dom";



export function Mensagem() {
    const context = useContext(AuthContext)
    const params = useParams();
    console.log(params)
    const {loggedInUser} = context
    
   
    const [texto, setTexto] = useState({
        msg: "",
        name: loggedInUser.user.name,
    })
    //console.log(texto)
    const [allTexto, setAllTexto] = useState([])
    const [sent, setSent] = useState(false)

    function handleChange(e) {
        setTexto({ ...texto, [e.target.name]: e.target.value });
        //console.log(texto)
      }
    //console.log(loggedInUser)
    async function handleSubmit(e) {
    e.preventDefault();
    
    setSent(true)
    
    
    try {
     await api.post("/messages/new-msg", { ...texto});
     
     
    } catch (error) {
      console.log(error);
    }
  }
  //console.log(sent)

  useEffect(() => {
      async function fetchAllTexto() {
          const response = await api.get("/messages/all-msg");
          console.log(response.data)
          console.log(loggedInUser.user._id)
          const filteredMsgs = response.data.filter((elemento) => {
        

            if(elemento.user === loggedInUser.user._id /*|| elemento.jobs._id === params.jobsId*/) {
                console.log(elemento)
                return elemento;
                
            }
           
        });
        //na pagina historico o dono do job não está podendo escrever msgs quando direcionado
          //if (response.data.user === loggedInUser.user.id) {
            //  return response.data
          //}
          console.log(filteredMsgs)
          setAllTexto(filteredMsgs);
          
      }
      fetchAllTexto() 
      setSent(false)
      
      
  },[sent])
   


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
                <ul> {allTexto.map((item) => {
                    return( 
                        <div>
                            <span>{item.name}</span>
                            <p>{item.msg}</p>
                        </div>
                    ) 
                })
                }
                    
                </ul>
            </div>

            
        </div>
    )
}