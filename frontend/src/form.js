//formulario de registro de clientes
import axios from "axios";
import React, { useState } from "react";

function Form() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
    lastname: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/user/addUser", formData);
      alert("Usuario registrado correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al registrar usuario");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/Logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert("Logged out successfully");
      }
    } catch (err) {
      console.error(err);
      alert("Error during logout");
    }
  };

  return (
    <>
      <>
        <h1>Formulario de Registro</h1>
        <form onSubmit={handleSubmit}>
          <label>Nombre de usuario:</label>
          <input type="text" name="username" onChange={handleChange} required />

          <label>Correo electrónico:</label>
          <input type="email" name="email" onChange={handleChange} required />

          <label>Nombre:</label>
          <input type="text" name="name" onChange={handleChange} required />

          <label>Apellido:</label>
          <input type="text" name="lastname" onChange={handleChange} required />

          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />

          <button type="submit">Registrar</button>
        </form>

        <div>
          <a href="/">¿Ya tienes una cuenta? Inicia sesión</a>
        </div>

        <div>
          <button formAction={handleLogout}> Logout </button>
        </div>
      </>
    </>
  );
}

export default Form;
