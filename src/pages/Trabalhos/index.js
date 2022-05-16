import { useState } from "react";
import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

export function Trabalhos() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: "",
    prazo: "",
    local: ""
  });

 
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="formTitle">Título:</label>
        <input
          id="formTitle"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
        />
        <label htmlFor="formDescription">Descrição:</label>
        <input
          id="formDescription"
          name="description"
          type="text"
          value={form.description}
          onChange={handleChange}
        />
        <label htmlFor="formTag">Tipo de serviço</label>
        <input
          id="formTag"
          type="text"
          name="tags"
          value={form.tags}
          onChange={handleChange}
        />
        <label htmlFor="formPrazo">Prazo</label>
        <input
          id="formPrazo"
          type="date"
          name="prazo"
          value={form.prazo}
          onChange={handleChange}
        />
        <label htmlFor="formLocal">Local do serviço</label>
        <input
          id="formLocal"
          type="text"
          name="local"
          value={form.local}
          onChange={handleChange}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
  
 
  
      
}
