const express = require("express");
const router = express.Router();
const Private_Room = require("../controllers/private_roomController");

router.get("/getPrivateRooms/:id_hive", Private_Room.getPrivateRooms);
router.get("/getPrivateRoomById/:id_private_room", Private_Room.getPrivateRoomById);
router.get("/getPrivateRoomsByUser/:id_user", Private_Room.getPrivateRoomsByUser); 
router.post("/addPrivateRoom", Private_Room.addPrivateRoom);
router.put("/updatePrivateRoom/:id_private_room", Private_Room.updatePrivateRoom);
router.patch("/toggleLockPrivateRoom/:id_private_room", Private_Room.toggleLockPrivateRoom); 
router.delete("/deletePrivateRoom/:id_private_room", Private_Room.deletePrivateRoom);

module.exports = router;