const bcrypt = require("bcrypt");
const UsersDB = require("../db/users.db");
// Function to add a new user
async function addUser(username, password, name) {
  const hashedPassword = await bcrypt.hash(password, 10);

  UsersDB.push({ username, password: hashedPassword, name, role: "USER" });
}

// Function to find a user by username
function findUserByUsername(username) {
  return UsersDB.find((user) => user.username === username);
}

module.exports = {
  addUser,
  findUserByUsername,
};
