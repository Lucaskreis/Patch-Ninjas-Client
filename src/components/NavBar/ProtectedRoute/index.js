import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/authContext";

export function ProtectedRoute(props) {

    const { component: Component} = props;
    const { loggedInUser} = useContext(AuthContext);

    if(loggedInUser){
        return <Component/>;
    }
    return <Navigate to="/"/>

}