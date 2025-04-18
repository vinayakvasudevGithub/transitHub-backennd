const asyncHandler = require("express-async-handler");
const adminModel = require("../../models/userModel/admin");
const { hashPassword, comparePassword } = require("../../utils/passwordHash");
const jwt = require("jsonwebtoken");
const busModel = require("../../models/transportModel/busModel");

const getAllAdmin = asyncHandler(async (req, res) => {
  const admin = await adminModel.find();
  res.json(admin);
});

const createAdmin = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.json({ error: "name is required" });
    }

    if (!password) {
      return res.json({ error: "password required" });
    }

    const isEmainExist = await adminModel.findOne({ email });

    if (isEmainExist) {
      return res.json({ error: "email allready taken" });
    }

    const hashedPassword = await hashPassword(password);

    const newAdmin = await adminModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(newAdmin);
  } catch (error) {
    console.error(error);
  }
});

const adminLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.json({ error: "user not exist" });
    }

    const isPasswordMatch = await comparePassword(password, admin.password);

    if (!isPasswordMatch) {
      return res.json({ error: "password not match" });
    }

    jwt.sign(
      {
        email: admin.email,
        id: admin._id,
        name: admin.name,
      },
      process.env.ACCESS_TOKEN_SECRET_ADMIN,
      {},
      (error, token) => {
        if (error) {
          console.log("JWT error", error);
          return res.status(500).json({ error: "Failed to generate token" });
        }
        res
          .cookie("token", token, {
            httpOnly: true, // Secure against XSS
            secure: process.env.NODE_ENV === "production", // HTTPS in production
            sameSite: "strict", // CSRF protection
          })
          .json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
          });
      }
    );
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// const adminProfile = asyncHandler(async (req, res) => {
//   try {
//     const { token } = req.cookies;

//     if (!token) {
//       res.status(401).json({
//         success: false,
//         message: "Unauthorized: No token provided",
//       });
//     }

//     jwt.verify(
//       token,
//       process.env.ACCESS_TOKEN_SECRET_ADMIN,
//       {},
//       (err, decodedUser) => {
//         if (err) {
//           console.error("JWT Verification Error:", err);
//           return res.status(401).json({
//             success: false,
//             message: "Unauthorized: Invalid or expired token",
//           });
//         }

//         const { id, name, email } = decodedUser;
//         // const bus = busModel.find({ "user.id": id });
//         res.status(200).json({
//           success: true,
//           users: { id, name, email },
//           // bus: { bus },
//         });
//       }
//     );
//   } catch (error) {
//     console.error(error);
//   }

// const { token } = req.cookies;

// if (!token) {
//   res.status(401).json({
//     success: false,
//     message: "Unauthorized: No token provided",
//   });
// }

// jwt.verify(
//   token,
//   process.env.ACCESS_TOKEN_SECRET_ADMIN,
//   {},
//   (err, decodedUser) => {
//     if (err) {
//       console.error("JWT Verification Error:", err);
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized: Invalid or expired token",
//       });
//     }
//     const { id, name, email } = decodedUser;
//     // const bus = await busModel.find({ "user.id": id })
//     res.status(200).json({
//       success: true,
//       user: { id, name, email },
//     });
//   }
// );
// });

const adminProfile = asyncHandler(async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    // Using promise version of jwt.verify
    const decodedUser = await new Promise((resolve, reject) => {
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET_ADMIN,
        (err, decoded) => {
          if (err) reject(err);
          else resolve(decoded);
        }
      );
    });

    const { id, name, email } = decodedUser;
    const buses = await busModel.find({ "user.id": id });

    return res.status(200).json({
      success: true,
      user: { id, name, email },
      buses,
    });
  } catch (error) {
    console.error("Admin Profile Error:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = {
  getAllAdmin,
  createAdmin,
  adminLogin,
  adminProfile,
};
