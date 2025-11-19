import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import keycloak from "./frontend/src/keycloak";

keycloak
  .init({ onLoad: "login-required" })
  .then((authenticated) => {
    if (!authenticated) {
      window.location.reload();
    } else {
      ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
          <App keycloak={keycloak} />
        </React.StrictMode>
      );
    }
  })
  .catch((error) => console.error("Keycloak init error:", error));
