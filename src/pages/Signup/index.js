import { useState } from "react";
import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import Patch from "../Assets/images/patch.png"
import Welcome from "../Assets/images/welcome.png"

export function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: ""
  });

 
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

 
  async function handleSubmit(e) {
    e.preventDefault();

    try {
     
      await api.post("/user/signup", { ...form});

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>

      <SHeader>
        <img src={ Patch } alt="" />
      </SHeader>

      <SMiddleSection>

        <img src={ Welcome } alt="" />

        <SSignup>

          <form onSubmit={handleSubmit}>
            <label htmlFor="formName">Name</label>
            <input
              id="formName"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
            />

            <label htmlFor="formEmail">E-mail</label>
            <input
              id="formEmail"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
            <label htmlFor="formphone">Telefone</label>
            <input
              id="formphone"
              name="phone"
              type="text"
              value={form.phone}
              onChange={handleChange}
            />
            {/* <label htmlFor="formaddress">Endereço:</label>
            <input
              id="formaddress"
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
            /> */}

            <label htmlFor="formPassword">Password</label>
            <input
              id="formPassword"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
            <label htmlFor="formConfirmPassword">Confirm Password</label>
            <input
              id="formConfirmPassword"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />

            <SCheck>
              <input type="checkbox" /><h5>Agree to terms and conditions</h5>
            </SCheck>

            <button type="submit">CREATE</button>

            <Link to="/"><h3>Already a user?</h3></Link>

          </form>

        </SSignup>

      </SMiddleSection>

    </>
  );
}


export default Signup;

// =========================== STYLES ============================= // 

const SHeader = styled.div`
display: flex;
justify-content: space-between;

& img {
  width: 250px;
  margin-top: -58px;
}
`;

const SMiddleSection = styled.div`
display: flex;
justify-content: space-evenly;
text-align: left;
//margin-top: 10px;
margin-left: 25px;


 & img {
   width: 550px;
   margin-top: -150px;
 }

 & input {
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    padding: 10px 38px;
    //margin-top: 10px;
    background-color: #D9D9D9;
    color:#5D5E5F;
    font-family: "Montserrat";
    display: block;
    margin-bottom: 10px;
    font-weight: 600;
 }

 & label {
  font-family: "Montserrat";
  color: #5D5E5F;
  font-style: oblique;
 }

 & button {
    border: 1px solid #0246B7;
    border-radius: 5px;
    padding: 10px 75px;
    margin-top: 10px;
    background-color: #0246B7;
    color: white;
    font-family: "Montserrat";
    font-style: oblique;
    font-size: 20px;
    cursor: pointer;
 }

 & h3 {
  font-family: "Montserrat";
  color: black;
  font-weight: 500;
  text-align: center;
 }

 `

const SSignup = styled.div`
border: 1px solid white;
border-radius: 15px;
padding: 35px;
background-color: white;
height: 450px;
margin-top: -135px;

& a {
  text-decoration: none;
}
`;

const SCheck = styled.div`

display: flex;

& h5 {
  margin-top: 3px;
  margin-left: 3px;
  font-family: "Montserrat";
  font-style: oblique;
  font-size: 10px;

}



`