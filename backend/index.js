const express = require("express");
const app = express();
const sequelize = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const hiveRoutes = require("./routes/hiveRoutes");
const work_roomRoutes = require("./routes/work_roomRoutes");
//const seedUsuarios = require("./seeders/usuarios");

//!Orden de ejecucion de las peticiones -> cors, body-parser, cookie-parser, routes
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/hive", hiveRoutes);
app.use("/api/work_room", work_roomRoutes);

app.get("/", (req, res) => {
  res.send("The API is running.");
});

app.post("/Logout", (req, res) => {
  res.clearCookie("JWT", {
    httpOnly: true,
    expires: new Date(Date.now() + 10 * 1000),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Conectado a la base de datos Postgre de Supabase de Detodito Market"
    );
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("Modelos vinculados");
  })
  .catch((err) => console.error("DB error:", err));
app.listen(8080, () => console.log("Listening to port 8080"));
