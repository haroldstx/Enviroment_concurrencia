const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PrivateRoom = sequelize.define("PrivateRoom", {
    id_private_room: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_hive: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "hive",
            key: "id_hive"
        }
    },
    room_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    is_locked: {
        type: DataTypes.BOOLEAN,
        defaultValue: true // Por defecto bloqueadas
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "private_room",
    timestamps: false
});

module.exports = PrivateRoom;