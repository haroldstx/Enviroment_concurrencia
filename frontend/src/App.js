import React, { useEffect, useState } from "react";
import keycloak from "./keycloak";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Inicializar Keycloak
    keycloak
      .init({ onLoad: "login-required" })
      .then((auth) => {
        setAuthenticated(auth);
      })
      .catch((err) => console.error("Error inicializando Keycloak", err));
  }, []);

  console.log("Keycloak object:", keycloak.authenticated, keycloak.tokenParsed);

  if (!authenticated) {
    return <div>Cargando autenticación...</div>;
  }

  const numberRoles =
    keycloak.tokenParsed?.resource_access?.account?.roles.length;
  if (
    keycloak.tokenParsed?.resource_access?.account?.roles.includes(
      "view-applications"
    )
  ) {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "50px",
          }}
        >
          <h1>
            Has iniciado sesión con permisos de administrador con un numero de{" "}
            {numberRoles} Roles asinados
          </h1>
          <h1>Bienvenido {keycloak.tokenParsed?.preferred_username}</h1>
          <p>
            Tu Nombre y apellido son: {keycloak.tokenParsed?.given_name}{" "}
            {keycloak.tokenParsed?.family_name}
          </p>
          <p>Tu token es:</p>
          <p style={{ display: "flex" }}>{keycloak.token}</p>

          <p>
            Deseas registrar un nuevo cliente? Haz click aqui:
            <button onClick={() => navigate("/form")}>Ir al formulario</button>
          </p>
        </div>
        <button onClick={() => keycloak.logout()}>Cerrar sesión</button>
      </>
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "50px",
        }}
      >
        <h1>Bienvenido {keycloak.tokenParsed?.preferred_username}</h1>
        <h3>Tienes {numberRoles} Roles asinados</h3>
        <p>
          Tu Nombre y apellido son: {keycloak.tokenParsed?.given_name}{" "}
          {keycloak.tokenParsed?.family_name}
        </p>
        <p>Tu token es:</p>
        <p style={{ display: "flex" }}>{keycloak.token}</p>
      </div>

      <button onClick={() => keycloak.logout()}>Cerrar sesión</button>
    </>
  );
}

export default App;
