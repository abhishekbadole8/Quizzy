import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModels";

// @desc Register User
// @route POST /api/user/register
// @access Public
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Check if all required fields are present
    if (!username || !email || !password) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
      return;
    }

    // Validate email format (basic check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ success: false, message: "Invalid email format" });
      return;
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res
        .status(400)
        .json({ success: false, message: "Email is already registered" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Return success response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error(
      `Error during user registration: ${(error as Error).message}`
    );
    res.status(500).json({ success: false, message: "Failed to create user" });
  }
};

// @desc Login User
// @route POST /api/user/login
// @access Public
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if all required fields are present
    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "All fields are mandatory" });
      return;
    }

    // Find user by username
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(401)
        .json({ success: false, message: "Invalid credentials provided." });
      return;
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res
        .status(401)
        .json({ success: false, message: "Invalid credentials provided." });
      return;
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    // Return success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      authToken: token,
    });
  } catch (error) {
    console.error(`Error during login: ${(error as Error).message}`);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

export default { createUser, loginUser };
