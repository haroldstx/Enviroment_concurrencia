const PrivateRoom = require("../models/private_room");

exports.getPrivateRooms = async(request, response) => {
    try {
        const { id_hive } = request.params;
        if (!id_hive) {
            return response.status(400).json({ message: "id_hive required." });
        }
        
        // Verificar que existe
        const Hive = require("../models/hive");
        const hiveExists = await Hive.findByPk(id_hive);
        if (!hiveExists) {
            return response.status(404).json({ message: "Hive not found." });
        }

        const private_rooms = await PrivateRoom.findAll({
            where: { id_hive }
        });

        response.json(private_rooms);
    } catch(error) {
        response.status(500).json({ error: error.message });
    }
}

exports.getPrivateRoomById = async(request, response) => {
    try {
        const { id_private_room } = request.params;
        
        const private_room = await PrivateRoom.findByPk(id_private_room);
        if (!private_room) {
            return response.status(404).json({ message: "Private room not found." });
        }

        response.json(private_room);
    } catch(error) {
        response.status(500).json({ error: error.message });
    }
}

exports.addPrivateRoom = async(request, response) => {
    try {
        const { id_hive, room_name, is_locked } = request.body;
        
        if (!id_hive || !room_name) {
            return response.status(400).json({ message: "id_hive and room_name are required." });
        }

        // Verificar que la colmena existe
        const Hive = require("../models/hive");
        const hiveExists = await Hive.findByPk(id_hive);
        if (!hiveExists) {
            return response.status(404).json({ message: "Hive not found." });
        }

        const newRoom = await PrivateRoom.create({ 
            id_hive, 
            room_name, 
            is_locked: is_locked !== undefined ? is_locked : true // Por defecto true
            // created_at y updated_at se llenan automáticamente
        });

        response.status(201).json(newRoom);
    } catch(error) {
        response.status(500).json({ error: error.message });
    }
}

exports.updatePrivateRoom = async(request, response) => {
    try {
        const { id_private_room } = request.params;
        const { room_name, is_locked } = request.body;
        
        const private_room = await PrivateRoom.findByPk(id_private_room);
        if (!private_room) {
            return response.status(404).json({ message: "Private room not found." });
        }

        // Actualizar y refrescar updated_at
        await private_room.update({ 
            room_name, 
            is_locked,
            updated_at: new Date() 
        });

        response.json(private_room);
    } catch(error) {
        response.status(500).json({ error: error.message });
    }
}

exports.deletePrivateRoom = async(request, response) => {
    try {
        const { id_private_room } = request.params;
        
        const deleteRoom = await PrivateRoom.findByPk(id_private_room);
        if (!deleteRoom) {
            return response.status(404).json({ message: "Private room not found." });
        }

        await deleteRoom.destroy();
        response.json({ message: "Private room deleted successfully." });
    } catch(error) {
        response.status(500).json({ error: error.message });
    }
}

exports.toggleLockPrivateRoom = async(request, response) => {
    try {
        const { id_private_room } = request.params;
        
        const private_room = await PrivateRoom.findByPk(id_private_room);
        if (!private_room) {
            return response.status(404).json({ message: "Private room not found." });
        }

        // Cambiar el estado de bloqueo
        await private_room.update({ 
            is_locked: !private_room.is_locked,
            updated_at: new Date() 
        });

        response.json({ 
            message: `Private room ${private_room.is_locked ? 'locked' : 'unlocked'} successfully.`,
            is_locked: private_room.is_locked 
        });
    } catch(error) {
        response.status(500).json({ error: error.message });
    }
}

//  Obtener salas privadas por usuario (donde el usuario tiene acceso)
exports.getPrivateRoomsByUser = async(request, response) => {
    try {
        const { id_user } = request.params;
        
        if (!id_user) {
            return response.status(400).json({ message: "id_user required." });
        }

        // Primero obtener las colmenas del usuario
        const User_Hive = require("../models/user_hive");
        const userHives = await User_Hive.findAll({
            where: { id_user }
        });

        const hiveIds = userHives.map(uh => uh.id_hive);
        
        if (hiveIds.length === 0) {
            return response.json([]);
        }

        // Obtener salas privadas de las colmenas del usuario
        const private_rooms = await PrivateRoom.findAll({
            where: { 
                id_hive: hiveIds 
            },
            include: [{
                model: require("../models/hive"),
                attributes: ['hive_name']
            }]
        });

        response.json(private_rooms);
    } catch(error) {
        response.status(500).json({ error: error.message });
    }
}