import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";

export function UserEdit() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
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

      navigate("/profile");
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
      
      <label htmlFor="formTelefone">Telefone:</label>
      <input
        id="formTelefone"
        name="telefone"
        type="text"
        value={form.phone}
        onChange={handleChange}
      />

      <label htmlFor="formaddress">Endereço:</label>
      <input
        id="formaddress"
        name="address"
        type="text"
        value={form.address}
        onChange={handleChange}
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
}
