import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AuthContextComponent } from "./contexts/authContext";
import { Profile } from "./pages/Profile";
import { Edit } from "./pages/Edit";
import { Trabalhos } from "./pages/Trabalhos";
import { Dashboard } from "./pages/Dashboard"

function App() {
  return (
    <>
      <AuthContextComponent>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit" element={<Edit/>} />
          <Route path="/createjob" element={<Trabalhos/>} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthContextComponent>
    </>
  );
}

export default App;
