import {Link } from "react-router-dom";
import {api} from "../../api/api";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";



export function Dashboard() {

    const [vagas, setVagas] = useState([]);

    const Context = useContext(AuthContext);
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
        console.log(elemento)

        if(elemento.user !==Context.loggedInUser.user._id) {
            return elemento;
        }
        console.log(vagas)
        console.log(Context.loggedInUser.user._id);
    });

    console.log(filteredVagas)

    return ( 
        <>

            <h1>Estão precisando</h1>
            <div>
                
                    {
                        filteredVagas.map((currentVagas) => {

                            const {title, local, prazo} = currentVagas;
                            return ( 
                                <div>
                                    <h1>{title}</h1>
                                    <h2>{local}</h2>
                                    <h2>{prazo}</h2>
                                </div> 
                            );
                        })

                    }

            </div>
        
        
        </>
    

     );
}

export default Dashboard;