const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    }
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw new Error("Password comparison failed");
  }
};

module.exports = { hashPassword, comparePassword };
