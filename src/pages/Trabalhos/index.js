import { useState, useContext } from "react";
import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import Patch from "../Assets/images/patch.png";
import { AuthContext } from "../../contexts/authContext";
import styled from "styled-components"

export function Trabalhos() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: "",
    prazo: "",
    local: ""
  });

  const { loggedInUser } = useContext(AuthContext);

 
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/jobs/createjob", { ...form})
      navigate("/Profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>

    <SHeader>
      <Link to="/profile"><img src={ Patch } alt="" /></Link>
      <h1>FIND A WORKER</h1>
      <img src={loggedInUser.user.img} alt="imagem de perfil"/>
    </SHeader>

    <SForms>

      <form onSubmit={handleSubmit}>
        
        <input
          id="formTitle"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
        />
        
        <input
          id="formTag"
          type="text"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="Service Type"
        />
        
        <input
          id="formPrazo"
          type="date"
          name="prazo"
          value={form.prazo}
          onChange={handleChange}
          placeholder="Term"
        />
        
        <input
          id="formLocal"
          type="text"
          name="local"
          value={form.local}
          onChange={handleChange}
          placeholder="Local"
        />
        <div>
          <STextarea
            id="formDescription"
            name="description"
            type="text"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            
          />
        </div>   
        <div>
          <button type="submit">CONFIRM</button>
        </div>
      </form>

      </SForms>

    </>
  );
}

export default Trabalhos;


// =========================== STYLES ============================= //

const SHeader = styled.div`
display: flex;
justify-content: space-between;

& img {
  width: 290px;
  margin-top: -58px;
}

& h1 {
  font-size: 60px;
  color: #F5F5F5;
  font-family: "Montserrat";
  text-transform: uppercase;
  font-style: italic;
  letter-spacing: -3px;
  margin-bottom: -5px;
  align-items: center;
  margin-top: 10px;
  text-align:center;
}
`;

const SForms = styled.div`

text-align: center;
margin-top: -40px;

& input {

  border: 1px solid #D9D9D9;
    border-radius: 5px;
    padding: 10px 38px;
    margin-top: 10px;
    background-color: #D9D9D9;
    color:#5D5E5F;
    font-family: "Montserrat";
    margin-left: 5px;


    ::placeholder {
      color: #B1C1B4;
      font-weight:bolder;
      font-style: italic;
    }
}

& button {

    border: 1px solid #0246B7;
    border-radius: 5px;
    padding: 10px 87px;
    margin-top: 20px;
    background-color: #0246B7;
    color: white;
    font-family: "Montserrat";
    font-style: oblique;
    font-size: 25px;
    cursor: pointer;
}
`;

const STextarea = styled.textarea`
border: 1px solid #D9D9D9;
    border-radius: 5px;
    padding: 10px 38px;
    margin-top: 10px;
    background-color: #D9D9D9;
    color:#5D5E5F;
    font-family: "Montserrat";
    margin-left: 5px;
    resize: none;
    width: 65%;
    height: 200px;

    ::placeholder {
      color: #B1C1B4;
      font-weight:bolder;
      font-style: italic;
    }
`;
