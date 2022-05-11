import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AuthContextComponent } from "./contexts/authContext";
import { Profile } from "./pages/Profile";
import { Edit } from "./pages/Edit";
import { Trabalhos } from "./pages/Trabalhos";

function App() {
  return (
    <>
      <AuthContextComponent>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Edit" element={<Edit/>} />
          <Route path="/Trabalhos" element={<Trabalhos/>} />
        </Routes>
      </AuthContextComponent>
    </>
  );
}

export default App;
