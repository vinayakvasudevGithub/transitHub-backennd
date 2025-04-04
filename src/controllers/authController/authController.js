const asyncHandler = require("express-async-handler");
const userModel = require("../../models/userModel/userModel");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../../utils/passwordHash");

const allUser = asyncHandler(async (req, res) => {
  const users = await userModel.find();
  res.json(users);
});

const register = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.json({ error: "name is required" });
    }

    if (!password || password.length < 5) {
      return res.json({
        error: "password is required should be atleast 6 charectors long",
      });
    }

    const isEmailExist = await userModel.findOne({ email });

    if (isEmailExist) {
      return res.json({ error: "email allready taken" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(newUser);
  } catch (error) {
    console.log(error);
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find the user (missing `await` in original)
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 2. Compare passwords
    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Password does not match" });
    }

    // 3. Generate JWT token
    jwt.sign(
      {
        email: user.email,
        id: user._id,
        name: user.name,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {},
      (error, token) => {
        if (error) {
          console.error("JWT Error:", error);
          return res.status(500).json({ error: "Failed to generate token" });
        }

        // 4. Set cookie and respond with user data
        res
          .cookie("token", token, {
            httpOnly: true, // Secure against XSS
            secure: process.env.NODE_ENV === "production", // HTTPS in production
            sameSite: "strict", // CSRF protection
          })
          .json({
            _id: user._id,
            name: user.name,
            email: user.email,
          });
      }
    );
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const profile = asyncHandler(async (req, res) => {
  const { token } = req.cookies;

  // 1. No token provided
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided",
    });
  }

  // 2. Verify JWT
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {}, (err, decodedUser) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or expired token",
      });
    }

    // 3. Return minimal safe user data
    const { id, name, email } = decodedUser;
    res.status(200).json({
      success: true,
      user: { id, name, email },
    });
  });
});

module.exports = { register, allUser, login, profile };
