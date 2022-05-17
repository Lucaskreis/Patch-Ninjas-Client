import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";

export function JobEdit() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: ""
  });

 // const [img, setImg] = useState("");

 useEffect(()=> {
     async function fetchTrabalho() {
         const response= await api.get("/jobs/Trabalhos");
         setForm(response.data)
    
     }
     fetchTrabalho();
 },[])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      
      await api.patch("/jobs/update-Trabalhos", { ...form});

      navigate("/createjob");
    } catch (error) {
      console.log(error);
    }
  }

  return (
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



      <button type="submit">Editar</button>
    </form>
  );
}


export default JobEdit;
