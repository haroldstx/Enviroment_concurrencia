import axios from "axios";
const url = "http://localhost:8080";
const realm = "Client";

async function getAdminToken() {
  const data = new URLSearchParams();
  data.append("client_id", "admin-cli");
  data.append("username", "admin");
  data.append("password", "adminpass");
  data.append("grant_type", "password");

  const res = await axios.post(
    `${url}/realms/master/protocol/openid-connect/token`,
    data
  );

  return res.data.access_token;
}

async function createUserInKeycloak(user) {
  const token = await getAdminToken();

  console.log("El pinche admin token es:", token);
  console.log("El pinche user es:", user);

  const res = await axios.post(
    `${url}/admin/realms/${realm}/users`,
    {
      username: user.username,
      email: user.email,
      firstName: user.name,
      lastName: user.lastname,
      enabled: true,
      credentials: [
        {
          type: "password",
          temporary: false,
          value: user.password,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.status;
}
export { createUserInKeycloak };
