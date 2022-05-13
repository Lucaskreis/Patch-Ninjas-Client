import { useState, useEffect, useContext } from "react";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";



export function Mensagem() {
    const context = useContext(AuthContext)
    const {loggedInUser} = context
    
   
    const [texto, setTexto] = useState({
        msg: "",
        name: loggedInUser.user.name,
    })
    console.log(texto)
    const [allTexto, setAllTexto] = useState([])
    const [sent, setSent] = useState(false)

    function handleChange(e) {
        setTexto({ ...texto, [e.target.name]: e.target.value });
        console.log(texto)
      }
      
    async function handleSubmit(e) {
    e.preventDefault();
    console.log("dentro da função")
    setSent(true)
    console.log(sent)
    
    try {
     const submit = await api.post("/messages/new-msg", { ...texto});
     console.log(submit)
     
     
    } catch (error) {
      console.log(error);
    }
  }
  console.log(sent)

  useEffect(() => {
      async function fetchAllTexto() {
          const response = await api.get("/messages/all-msg");
          setAllTexto(response.data);
          
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