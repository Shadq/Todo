const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email | !password) {
    res.json({ error: "invalid credentials" });
  }
  const user = User.findOne({ email: email }, async (err, data) => {
    if (data === null) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });
      res.json({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        token: generateToken(newUser._id),
      });
    } else {
      res.json({ error: "user already exists" });
    }
  });
};

const login = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne(
    { name: name, email: email },
    async (err, data) => {
      if (data === null) {
        res.json({ error: "invalid name or email" });
      } else {
        const decodedPassword = await bcrypt.compare(password, data.password);
        if (data !== null && decodedPassword === true) {
          res.status(201).json({
            name: data.name,
            email: data.email,
            password: data.password,
            token: generateToken(data._id),
          });
        } else {
          res.json({ error: "invalid password" });
        }
      }
    }
  ).clone();
};

const getMe = (req, res) => {
  const user = User.findById(req.user._id, (err, data) => {
    res.send({ user: data });
  });
};

const logout = async (req, res) => {
  // Eliminazione dell token
  res.json({ message: "logout" });
};

const generateToken = (id) => {
  return jwt.sign({ id }, "Lofi", {
    expiresIn: "7d",
  });
};

module.exports = { register, login, getMe, logout };
