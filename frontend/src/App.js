import React, { useEffect, useState } from "react";
import keycloak from "./keycloak";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

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

  return (
    <div>
      <h1>Bienvenido {keycloak.tokenParsed?.preferred_username}</h1>

      <p>Tu token es:</p>
      <pre>{keycloak.token}</pre>

      <button onClick={() => keycloak.logout()}>Cerrar sesión</button>
    </div>
  );
}

export default App;
