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


function App() {
  return (
    <>
      <AuthContextComponent>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/userEdit" element={<UserEdit/>} /> 
          <Route path="/createjob" element={<Trabalhos/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/mensagem" element={<Mensagem />} />
        </Routes>
      </AuthContextComponent>
    </>
  );
}

export default App;
