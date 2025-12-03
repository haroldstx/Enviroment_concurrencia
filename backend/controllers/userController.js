const jswToken = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });
const User = require("../models/user");
const { comparePassword } = require("../middleware/Password");
const { now } = require("sequelize/lib/utils");

exports.getUsers = async (request, response) => {
  try {
    const users = await User.findAll();
    response.json(users);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

exports.LoginUser = async (request, response) => {
  try {
    const { user_name, password } = request.body;
    const user = await User.findOne({
      where: { user_name },
    });

    const isValid = await comparePassword(password, user.password);

    if (!user || !isValid) {
      return response
        .status(404)
        .json({ message: "User not found or invalid password." });
    }

    const Payload = {
      id: user.id,
      user_name: user.user_name,
      email: user.email,
      rol: user.rol,
      permissions: user.privileges,
    };

    const token = jswToken.sign(Payload, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const cookieOption = {
      expires: new Date(Date.now() + 3600000), //1hora
      httpOnly: true,
      sameSite: "strict",
    };
    response.cookie("JWT", token, cookieOption);

    response.status(200).json({
      status: "Success!",
      user: {
        id: user.id,
        user_name: user.user_name,
        email: user.email,
        rol: user.rol,
        permissions: user.privileges,
      },
      data: token,
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

exports.getUserByid = async (request, response) => {
  try {
    const { id } = request.params;
    const user = await User.findByPk(id);
    if (!user) {
      return response.status(404).json({ message: "User not found." });
    }
    response.json(user);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

exports.addUser = async (request, response) => {
  try {
    const { user_name, password, email, first_name, last_name } = request.body;
    const newUser = await User.create({
      user_name,
      password,
      email,
      first_name,
      last_name,
    });

    response.json(newUser);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

exports.inviteUser = async (request, response) => {
  try {
    const { email } = request.params;
    const user = await User.findAll({
      where: { email },
    });
    if (!user) {
      return response.status(404).json({ message: "User not found." });
    }

    response.json(user);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
