import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import Patch from "../Assets/images/patch.png"
import Frase from "../Assets/images/login.png"
import Ninja from "../Assets/images/ninja.png"


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

      <SHeader>
        <img src={ Patch } alt="" />
      </SHeader>

      <SMiddleSection className="loginSection">

        <img src={ Frase } alt="" />

        <SLogin>
          <img src={Ninja} alt="" />
          <h1>LOGIN</h1>
        <form onSubmit={handleSumit} className="loginContainer">
          <div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="input"
              placeholder="E-mail"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="input"
              placeholder="Password"
            />
          </div>

          <div className="btnContainer">
            <button type="submit" className="loginButton">SIGN IN</button>
            <h4>Forgot your password?</h4>
            <Link to="/signup"><h3>CREATE MY ACCOUNT</h3></Link>
          </div>
        </form>
        </SLogin>
      </SMiddleSection>
    </div>
  );
}

export default Login;

// =========================== STYLES ============================= // 

const SHeader = styled.div`
display: flex;
justify-content: space-between;

& img {
  width: 200px;
  margin-top: -58px;
}
`;

const SMiddleSection = styled.div`
display: flex;
justify-content: space-around;
text-align: center;
margin-top: 10px;


 & img {
   width: 550px;
   margin-top: -100px;
 }

 & input {
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    padding: 10px 38px;
    margin-top: 10px;
    background-color: #D9D9D9;
    color:#5D5E5F;
    font-family: "Montserrat";
    

    ::placeholder {
      color: #B1C1B4;
      font-weight:bolder;
    }
 }

 & button {
    border: 1px solid #0246B7;
    border-radius: 5px;
    padding: 10px 87px;
    margin-top: 10px;
    background-color: #0246B7;
    color: white;
    font-family: "Montserrat";
    //font-style: oblique;
    cursor: pointer;
 }
`;

const SLogin = styled.div`
border: 1px solid white;
border-radius: 15px;
padding: 25px;
background-color: white;
height: 380px;


& img {
width: 250px;
z-index: 1;
margin-top: -159px;
margin-bottom: -60px;
margin-left: 15px;

}

& h1 {
  color: black;
  font-family: "Montserrat";
  text-align: center;
  font-style: italic;
  font-weight:lighter;
  margin-bottom: 10px;
  
}

& h4 {
  font-family: "Montserrat";
  text-align: center;
  color: #5D5E5F;
  margin-top: 14px;
  font-style: oblique;
}

& h3 {
  /* border: 1px solid #D9D9D9;
  border-radius: 15px;
  background-color: #D9D9D9; */
  font-family: "Montserrat";
  text-align: center;
  color: #5D5E5F;
  margin-top: 62px;
  align-content: center;
  cursor: pointer;
  
}
`

