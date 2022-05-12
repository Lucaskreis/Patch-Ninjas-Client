import {Link } from "react-router-dom";
import {api} from "../../api/api";
import { useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";


export function Historico() {

    const [profile, setProfile] = useState([{}]);

    const [isLoad, setIsLoad] = useState(true);

    
    

    useEffect (() => {
    
        async function fetchProfile() {
            const response = await api.get("/user/profile")
            setProfile({...response.data})
            setIsLoad(false);
        }
        fetchProfile()
    }, [])



   console.log(profile)
    return ( 
        <>
        
        <h1>Suas Requisições</h1>

            <div> 
                {!isLoad &&
            <>
            {
                        profile.jobs.map((currentProfile) => {

                            const {title, local, prazo} = currentProfile;
                            return ( 
                                <div>
                                    <h1>{title}</h1>
                                    <h2>{local}</h2>
                                    <h2>{prazo}</h2>
                                </div> 
                            );
                        })

                    }

            </>
            }
                    
            </div>
        
        </>
     );
}

export default Historico;