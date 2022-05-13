import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";

export function UserEdit() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

 // const [img, setImg] = useState("");

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

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="formName">Nome:</label>
      <input
        id="formName"
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
      />
     { /*<label htmlFor="formImg">Sua foto de perfil:</label>
      <input value = {form.img} type="file" id="formImg" onChange={handleImage} /> */}

      <label htmlFor="formEmail">E-mail:</label>
      <input
        id="formEmail"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />
      <label htmlFor="formPassword">Senha:</label>
      <input
        id="formPassword"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />
      <label htmlFor="formConfirmPassword">Confirmação de senha</label>
      <input
        id="formConfirmPassword"
        type="password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
}
