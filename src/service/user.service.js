const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const UsersDB = require("../db/users.db");
const bookService = require("./books.service");
const User = require("../database/models/user.model");
const { ObjectId } = require("mongoose");

// Function to add a new user
async function addUser(req, res) {
  const { name, age, email, group, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    age,
    email,
    group,
    username,
    blocked: false,
    taken: [],
    returned: [],
    password: hashedPassword,
    role: "USER",
  });

  try {
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Function to find a user by username
async function findUserByUsername(username) {
  return await User.findOne({ username: username }).exec();
}

async function getUsers(res) {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getUserById(userId, res) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: "User is not found" });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function updateUser(res, params) {
  try {
    const user = await User.findByIdAndUpdate(
      params.userId,
      params.updateData,
      {
        new: true,
      }
    );
    if (!user) {
      res.status(404).json({ error: "User is not found" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function removeUser(res, id) {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json("User is not found");
    } else {
      res.send(`User has been deleted..`);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

function validateCreateInput(params) {
  const newUser = {};
  newUser.id = uuidv4();
  const { name, age, group, email } = params;
  if (!name) {
    throw new Error("name field is not found");
  }
  newUser.name = name;

  if (!age) {
    throw new Error("age field is not found");
  }
  newUser.age = age;

  if (!group) {
    throw new Error("group field is not found");
  }
  newUser.group = group;

  if (!email) {
    throw new Error("email field is not found");
  }
  newUser.email = email;

  newUser.blocked = false;
  newUser.taken = [];
  newUser.returned = [];

  return newUser;
}

const takeBook = (user, bookId) => {
  if (user.role === "STUDENT") {
    if (user.blocked) throw new Error("You are blocked by admin");
    const { book } = bookService.getById(bookId);
    const index = UsersDB.findIndex((student) => {
      return student.username === user.username;
    });
    UsersDB[index].taken.push({
      book_id: book.id,
      time: Date.now(),
    });
    return UsersDB[index];
  } else {
    throw new Error("You don't have a right to rent a book");
  }
};

const returnBook = () => {};

const validateUpdateInput = (params) => {
  const { name, age, group, email, blocked, role, username, password } = params;
  const res = {};

  if (name) res.name = name;
  if (age) res.age = age;
  if (group) res.group = group;
  if (email) res.email = email;
  if (blocked) res.blocked = blocked;
  if (role) res.role = role;
  if (username) res.username = username;
  if (password) res.password = password;

  return res;
};

module.exports = {
  addUser,
  getUserById,
  getUsers,
  updateUser,
  removeUser,
  takeBook,
  returnBook,
  validateCreateInput,
  validateUpdateInput,
  findUserByUsername,
};
