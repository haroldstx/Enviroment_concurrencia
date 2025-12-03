const express = require("express");
const router = express.Router();
const User = require("../controllers/userController");
const {
  VerifyToken,
  VerifyRolAdmin,
  VerifyPermissions,
} = require("../middleware/verifyToken");

//Rutas publicas
router.post("/login", User.LoginUser);

//Rutas protegidas (Requieren token)
router.use(VerifyToken);
router.get("/inviteUser/:email", User.inviteUser);

//Rutas solo para administradores y hereda las rutas protegidas (ya requiere token)
router.use(VerifyRolAdmin("admin"));

//!Listar rutas de administrador
router.get("/getUsers", User.getUsers);
router.post("/addUser", User.addUser);
router.get("/getUserByid/:id", User.getUserByid);

module.exports = router;
