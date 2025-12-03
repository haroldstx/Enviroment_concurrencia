const usuarios = require("../models/user");

const { hashPassword } = require("../middleware/Password");

const seedUsuarios = async () => {
  try {
    await usuarios.bulkCreate([
      {
        user_name: "admin",
        password: await hashPassword("admin1234"),
        email: "admin@example.com",
        first_name: "Admin",
        last_name: "User",
        rol: "administrator",
        privileges: "all",
      },
      {
        user_name: "john_doe",
        password: await hashPassword("password1"),
        email: "john_doe@example.com",
        first_name: "John",
        last_name: "Doe",
        rol: "user",
        privileges: "read",
      },
      {
        user_name: "jane_smith",
        password: await hashPassword("password2"),
        email: "jane_smith@example.com",
        first_name: "Jane",
        last_name: "Smith",
        rol: "user",
        privileges: "read",
      },
    ]);
    console.log("Usuarios seeded successfully.");
  } catch (error) {
    console.error("Error seeding usuarios:", error);
  }
};

module.exports = seedUsuarios;
