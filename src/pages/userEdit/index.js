import { useEffect, useState, useContext } from "react";
import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import Patch from "../Assets/images/patch.png";
import styled from "styled-components"
import { AuthContext } from "../../contexts/authContext";


export function UserEdit() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: ""
  });

 // const [img, setImg] = useState("");

 const { loggedInUser } = useContext(AuthContext);

 useEffect(()=> {
     async function fetchCadastro() {
         const response= await api.get("/user/profile");
         setForm(response.data)
    
     }
     fetchCadastro();
 },[])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

   /*{function handleImage(e) {
    setImg(e.target.files[0]);
  } 

   async function handleUpload() {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);

      const response = await api.post("/upload-image", uploadData);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  } }*/

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      //const imgURL = await handleUpload();
      await api.patch("/user/update-profile", { ...form});

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>

    <SHeader>
      <Link to="/profile"><img src={ Patch } alt="" /></Link>
      <h1>EDIT PROFILE</h1>
    </SHeader>

    <SMiddleSection>

      <SInput>
        <form onSubmit={handleSubmit}>
          <input
            id="formName"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
          />
              { /*<label htmlFor="formImg">Sua foto de perfil:</label>
                <input value = {form.img} type="file" id="formImg" onChange={handleImage} /> */}

          
          <input
            id="formEmail"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <button type="submit">CONFIRM</button>
        </form>
      </SInput>

      <SPhoto> 
        <img src={loggedInUser.user.img} alt={loggedInUser.user.name} />
        <button>Change Photo</button>
      </SPhoto>

    </SMiddleSection>

    </>
  );
}

export default UserEdit;

// =========================== STYLES ============================= //

const SHeader = styled.div`
display: flex;
gap: 180px;

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
  //margin-right: 50px;
}
`;

const SMiddleSection = styled.div`
display: flex;
justify-content: space-around;
`

const SInput = styled.div`


& input {
  border: 1px solid #D9D9D9;
  border-radius: 5px;
  padding: 10px 38px;
  margin-top: 15px;
  background-color: #D9D9D9;
  color: #5D5E5F;
  font-family: "Montserrat";
  cursor: pointer;
  display: block;
  font-size: 180%;
  text-decoration: solid;
}

& button {
    border: 1px solid #0246B7;
    border-radius: 5px;
    padding: 10px 50px;
    margin-top: 30px;
    background-color: #0246B7;
    color: white;
    font-family: "Montserrat";
    //font-style: oblique;
    cursor: pointer;
    font-size: 130%;
 }
`;

const SPhoto = styled.div`
display:flex;
flex-direction: column;
border: 1px solid green;

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
`
