const { User, sequelize } = require("../models");
const bcrypt = require("bcrypt");
const sendMail = require("../utils/mail");
const jwt = require("jsonwebtoken");

const adminSignup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingAdmin = await User.findOne({
      where: { email },
    });
    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "admin",
    });
    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      newAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );
    console.log("Token generated:", token);
    res.status(200).json({
      success: true,
      message: "Signin successful.",
      token,
      role: user.role,
      userId: user.id,
    });
  } catch (err) {
    console.error("Signin Error:", err);
    res.status(500).json({ success: false, message: "Error during signin." });
  }
};

const createAndInviteUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Only admin can create users." });
  }
  try {
    const existingUser = await User.findOne({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      role,
      password: hashedPassword,
      isInvited: true,
      invitedBy: req.user.userId,
    });

    // Send invitation email
    const inviteMessage = `
        <h1>Welcome, ${username}!</h1>
        <p>You have been invited to join our platform. Use the following credentials:</p>
        <ul>
          <li>Username: ${username}</li>
          <li>Email:${email}</li>
          <li>Password: ${password}</li>
        </ul>
        <p>Please log in to your account with this password use this link https://taskify-frontend-liart.vercel.app/login </p>
      `;

    await sendMail({ email }, "You're Invited to Our Platform!", inviteMessage);
    res
      .status(201)
      .json({ message: "User created and invitation sent.", user: newUser });
  } catch (error) {
    console.error("Error creating or inviting user:", error.message);
    res.status(500).json({ message: "Server error." });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "isInvited"],
      where: {
        role: "user",
      },
    });
    const userCount = users.length;
    if (!users.length) {
      return res.status(404).json({
        message: "No User found.",
      });
    }
    res
      .status(200)
      .json({ message: "users fetch successfully", users, userCount });
  } catch (error) {
    await t.rollback();
    console.error("Error getting all users:", error.message);
    res.status(500).json({ message: "Server error." });
  }
};

const deleteUserByAdmin = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.destroy({
      where: { id: userId },
    });

    if (deletedUser === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

module.exports = {
  adminSignup,
  createAndInviteUser,
  signin,
  getAllUsers,
  deleteUserByAdmin,
};
