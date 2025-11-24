import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "Client",
  clientId: "12345",
});

export default keycloak;
