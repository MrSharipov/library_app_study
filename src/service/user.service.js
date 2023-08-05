const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const UsersDB = require("../db/users.db");
const bookService = require("./books.service");

// Function to add a new user
async function addUser(name, age, email, group, username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  UsersDB.push({
    id: uuidv4(),
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
}

// Function to find a user by username
function findUserByUsername(username) {
  return UsersDB.find((user) => user.username === username);
}

function getUsers() {
  return UsersDB;
}

function getUserById(id) {
  const index = UsersDB.findIndex((user) => {
    return user.id === id;
  });

  if (index === -1) {
    throw new Error("User is not found");
  } else {
    return {
      status: "success",
      student: UsersDB[index],
    };
  }
}

function updateUser(params) {
  const index = UsersDB.findIndex((user) => {
    return user.id === params.userId;
  });

  if (index === -1) {
    throw new Error("User data is not fount");
  }

  const updatedUser = { ...UsersDB[index], ...params.updateData };
  UsersDB[index] = updatedUser;

  return {
    status: "success",
    student: updatedUser,
  };
}

function removeUser(id) {
  const index = UsersDB.findIndex((user) => {
    return user.id === id;
  });

  if (index === -1) {
    throw new Error("User is not found");
  }

  const deletedUser = UsersDB.splice(index, 1);

  return {
    status: "success",
    user: deletedUser,
  };
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
