import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AuthContextComponent } from "./contexts/authContext";
import { Profile } from "./pages/Profile";
import { UserEdit } from "./pages/userEdit";
import { Trabalhos } from "./pages/Trabalhos";
import { Dashboard } from "./pages/Dashboard";
import { Historico } from "./pages/Historico";
import { Mensagem } from "./pages/Mensagem";
import {JobEdit} from "./pages/jobEdit";
import {JobDelete} from "./pages/JobDelete";
import { ProtectedRoute } from "./components/NavBar/ProtectedRoute";
import "../src/index.css"




function App() {
  return (
    <>
      
      <AuthContextComponent>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProtectedRoute component={Profile}/>} />
          <Route path="/userEdit" element={<ProtectedRoute component={UserEdit}/>} /> 
          <Route path="/createjob" element={<ProtectedRoute component={Trabalhos}/>} /> 
          <Route path="/jobEdit/:jobEdit" element={<ProtectedRoute component={JobEdit}/>} /> 
          <Route path="/jobDelete/:jobDelete" element={<ProtectedRoute component={JobDelete}/>} /> 
          <Route path="/dashboard" element={<ProtectedRoute component={Dashboard}/>} /> 
          <Route path="/historico" element={<ProtectedRoute component={Historico}/>} />
          <Route path="/mensagem/:jobId" element={<ProtectedRoute component={Mensagem}/>} /> 
        </Routes>
      </AuthContextComponent>
      
    </>
  );
}

export default App;


// ========================================= STYLES ==================================== //
