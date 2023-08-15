const mongoose = require("mongoose");
const dbUrl =
  "mongodb+srv://janobhope95:jVeMooO6yuRzOPgW@cluster0.1d1yj9n.mongodb.net/library";

function dbConnect() {
  mongoose.connect(dbUrl);
  const database = mongoose.connection;

  database.on("error", (error) => {
    console.log(error);
  });

  database.once("connected", () => {
    console.log("Database Connected");
  });
}

module.exports = dbConnect;
