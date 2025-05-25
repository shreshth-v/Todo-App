import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import CustomError from "../utils/customError.js";

const generateToken = (userId) =>
  jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Signup
export const signupUser = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) throw new CustomError(400, "User already exists");

  const newUser = new User({ name, email, password });

  await newUser.save();

  res.status(201).json({ message: "User registered successfully" });
});

// Login
export const loginUser = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new CustomError(400, "User does not exist");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new CustomError(400, "Incorrect Password");

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

// Logout
export const logoutUser = asyncWrapper(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// Check Auth
export const checkAuth = (req, res) => {
  const { _id, name, email } = req.user;
  res.status(200).json({ _id, name, email });
};
