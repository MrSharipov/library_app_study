const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/auth.middleware");
const usersService = require("../service/user.service");

// Route to register a new user
router.post("/register", async (req, res) => {
  const { username, password, name } = req.body;

  if (!username || !password || !name) {
    return res
      .status(400)
      .json({ error: "Username, password and name are required" });
  }

  const existingUser = usersService.findUserByUsername(username);

  if (existingUser) {
    return res.status(409).json({ error: "Username already exists" });
  }

  await usersService.addUser(username, password, name);

  res.status(201).json({ message: "User registered successfully" });
});

// Route to log in and get the token
router.post("/login", authenticate, (req, res) => {
  res.json({
    user: req.user,
    token: req.token,
  });
});

module.exports = router;
