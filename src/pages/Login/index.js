import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import "./index.css"

export function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { setLoggedInUser } = useContext(AuthContext);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSumit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/user/login", form);
      setLoggedInUser({ ...response.data });

      localStorage.setItem("loggedInUser", JSON.stringify(response.data));

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div>

      </div>
      <div className="loginSection">
        <form onSubmit={handleSumit} className="loginContainer">
          <div>
          <label>Email:  </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div>
            <label>Senha:  </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="btnContainer">
            <button type="submit" className="loginButton">Entrar!</button>
          </div>
        </form>
      </div>
    </div>
  );
}
