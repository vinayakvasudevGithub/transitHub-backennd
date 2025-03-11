const asyncHandler = require("express-async-handler");
const UserModel = require("../../models/userModel/userModel");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel/userModel");

//@desc Rrgister a user
//@route POST users/register
//@acces public
//will add the hash psswrd from dipesh malvia 1:06:30
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All field are mandatory!");
  }
  const userAvailable = await UserModel.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("User allready registered!");
  }

  const newUser = await UserModel.create({
    username,
    email,
    password,
  });

  console.log(`user created ${newUser}`);

  if (newUser) {
    res.status(201).json({ _id: newUser.id, email: newUser.email });
  } else {
    res.status(400);
    throw new Error("user data is not valid");
  }
  //   res.json({ message: "reg" });
});

//@desc login User
//@route POST users/login
//@acces public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await userModel.findOne({ email });
  //compare password
  if (user && password === user.password) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }

  //   res.json({ message: user.password });
});

//@desc current User info
//@route get users/current
//@acces privet
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
