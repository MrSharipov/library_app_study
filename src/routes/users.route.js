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

  const existingUser = await usersService.findUserByUsername(username);

  if (existingUser) {
    return res.status(409).json({ error: "Username already exists" });
  }

  await usersService.addUser(req, res);
});

// Route to log in and get the token
router.post("/login", authenticate, (req, res) => {
  res.json({
    user: req.user,
    token: req.token,
  });
});

//get all
router.get("/", authorize, async (req, res) => {
  await await usersService.getUsers(res);
});

//get by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  return await usersService.getUserById(id, res);
});

//update student
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  //Validate input data
  const validatedData = usersService.validateUpdateInput(req.body);
  // Update user data
  return await usersService.updateUser(res, {
    userId: id,
    updateData: validatedData,
  });
});

//remove student
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  return await usersService.removeUser(res, id);
});

router.post("/take", authorize, (req, res) => {
  const user = req.user;
  const bookId = req.body.bookId;
  res.json(usersService.takeBook(user, bookId));
});

router.post("/return", (req, res) => {});

module.exports = router;
