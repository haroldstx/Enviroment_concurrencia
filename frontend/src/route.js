import express from "express";
const route = express.Router();

import {
  addUser,
  getUsers,
  inviteUser,
} from "../controllers/userController.js";

route.post("/api/register", async (req, res) => {
  console.log("Body:", req.body);
  try {
    await addUser(req.body);
    res.json({ msg: "Usuario creado" });
  } catch (error) {
    console.error(error.response?.data);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

route.get("/api/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

route.get("/api/invite/:email", async (req, res) => {
  try {
    const user = await inviteUser(req.params.email);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al invitar usuario" });
  }
});

export default route;
