import express from "express";
import route from "./route.js";
import cors from "cors";

const app = express();

// Middlewares para parsear body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

// Rutas
app.use(route);

app.listen(3003, () => console.log("Servidor corriendo en puerto 3003"));
