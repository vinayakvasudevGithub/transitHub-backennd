const contact = require("../../models/ticketModel/contactmodel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const getAll = asyncHandler(async (req, res) => {
  const allContact = await contact.find();
  res.json(allContact);
});

const createContact = asyncHandler(async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ error: "not authorized" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.id;

    const { name } = req.body;

    const createContact = await contact.create({
      user: userId,
      name: name,
    });

    res.json(createContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

const getContact = asyncHandler(async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(401).json(null);

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const contacts = await contact.find({ user: decoded.id });

    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = { createContact, getContact, getAll };
