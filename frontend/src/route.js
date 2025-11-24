import express from "express";
const route = express.Router();

import { createUserInKeycloak } from "./controller.js";

route.post("/api/register", async (req, res) => {
  console.log("Body:", req.body);
  try {
    await createUserInKeycloak(req.body);
    res.json({ msg: "Usuario creado" });
  } catch (error) {
    console.error(error.response?.data);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

export default route;
