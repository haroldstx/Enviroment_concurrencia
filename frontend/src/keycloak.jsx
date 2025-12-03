import React, { useState } from "react";
import "./login.css";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/user/login",
        {
          user_name: email,
          password,
        },
        { withCredentials: true }
      );

      console.log("Data:", data);

      if (Object.keys(data).length != 0) {
        alert("Usuario Logeado!  :)");
      }

      if (data.user.rol === "administrator") {
        window.location.href = "/dashboard";
        console.log(data);
      } else if (data.user.rol === "user") {
        window.location.href = "/usuarios";
        console.log(data);
      }
    } catch (error) {
      console.error(
        "Error en login:",
        error.response?.data?.message || error.message
      );
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Ingresar</button>

        <div>
          <a href="/form">No tienes una cuenta? Regístrate</a>
        </div>
      </form>
    </div>
  );
}
