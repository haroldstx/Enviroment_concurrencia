import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "Hive",
  clientId: "mi-app-de-prueba",
});

export default keycloak;
