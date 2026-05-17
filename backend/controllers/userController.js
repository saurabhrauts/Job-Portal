import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Registration
export const register = async (req, res) => {

  try {

    const {
      fullname,
      email,
      phoneNumber,
      password,
      role
    } = req.body;

    if (
      !fullname ||
      !email ||
      !phoneNumber ||
      !password ||
      !role
    ) {

      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });

    }

    if (!email.includes("@")) {

      return res.status(400).json({
        message: "Invalid email",
        success: false,
      });

    }

    if (password.length < 6) {

      return res.status(400).json({
        message: "Password must be at least 6 characters",
        success: false,
      });

    }

    const allowedRoles = ["student", "recruiter"];

    if (!allowedRoles.includes(role)) {

      return res.status(400).json({
        message: "Invalid role",
        success: false,
      });

    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists",
        success: false,
      });

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server error",
      success: false,
    });

  }
};

// Login
export const login = async (req, res) => {

  try {

    const { email, password, role } = req.body;

    if (!email || !password || !role) {

      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });

    }

    let user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });

    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {

      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });

    }

    if (role !== user.role) {

      return res.status(400).json({
        message: "Account doesn't exist with current role",
        success: false,
      });

    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res
      .status(200)
      .cookie("token", token, {

        httpOnly: true,

        sameSite: "lax",

        secure: false,

        maxAge: 1 * 24 * 60 * 60 * 1000,

      })
      .json({

        message: `Welcome back ${user.fullname}`,

        success: true,

        user,

      });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server error",
      success: false,
    });

  }
};

// Logout
export const logout = async (req, res) => {

  try {

    return res
      .status(200)
      .cookie("token", "", {

        httpOnly: true,

        expires: new Date(0)

      })
      .json({

        message: "Logout successfully",

        success: true

      });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server error",
      success: false
    });

  }
};

// Update Profile
export const updateProfile = async (req, res) => {

  try {

    const {
      fullname,
      phoneNumber,
      bio,
      skills
    } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {

      return res.status(404).json({
        message: "User not found",
        success: false
      });

    }

    if (fullname) user.fullname = fullname;

    if (phoneNumber) user.phoneNumber = phoneNumber;

    if (bio) user.profile.bio = bio;

    if (skills) user.profile.skills = skills;

    await user.save();

    return res.status(200).json({

      message: "Profile updated successfully",

      success: true,

      user

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server error",
      success: false
    });

  }
};