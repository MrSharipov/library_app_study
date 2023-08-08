// mongodb+srv://janobhope95:jVeMooO6yuRzOPgW@cluster0.1d1yj9n.mongodb.net/
const mongoose = require("mongoose");
const mongoDbUrl =
  "mongodb+srv://janobhope95:jVeMooO6yuRzOPgW@cluster0.1d1yj9n.mongodb.net/library";

const dbService = () => {
  mongoose.connect(mongoDbUrl);
  const database = mongoose.connection;

  database.on("error", (error) => {
    console.log(error);
  });

  database.once("connected", () => {
    console.log("Database Connected");
  });
};
module.exports = dbService;
