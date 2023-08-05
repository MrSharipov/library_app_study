const express = require("express");
const router = express.Router();

const { authenticate, authorize } = require("../middleware/auth.middleware");
const usersService = require("../service/user.service");

// Route to register a new user
router.post("/register", async (req, res) => {
  const { name, age, email, group, username, password } = req.body;

  if (!username || !password || !name || !age || !email || !group) {
    return res.status(400).json({
      error: "name age, email, group, username and password are required",
    });
  }

  const existingUser = usersService.findUserByUsername(username);

  if (existingUser) {
    return res.status(409).json({ error: "Username already exists" });
  }

  await usersService.addUser(name, age, email, group, username, password);

  res.status(201).json({ message: "User registered successfully" });
});

// Route to log in and get the token
router.post("/login", authenticate, (req, res) => {
  res.json({
    user: req.user,
    token: req.token,
  });
});

//get all
router.get("/", authorize, (req, res) => {
  res.json(usersService.getUsers());
});

//get by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json(usersService.getUserById(id));
});

//update student
router.put("/:id", (req, res) => {
  const { id } = req.params;
  //Validate input data
  const validatedData = usersService.validateUpdateInput(req.body);
  // Update user data
  res.json(usersService.updateUser({ userId: id, updateData: validatedData }));
});

//remove student
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.json(usersService.removeUser(id));
});

router.post("/take", authorize, (req, res) => {
  const user = req.user;
  const bookId = req.body.bookId;
  res.json(usersService.takeBook(user, bookId));
});

router.post("/return", (req, res) => {});

module.exports = router;
