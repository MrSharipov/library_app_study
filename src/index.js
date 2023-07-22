const express = require("express");
const bodyParser = require("body-parser");
const BookRouter = require("./routes/books.route");
const StudentRouter = require("./routes/students.route");
const WorkersRouter = require("./routes/workers.route");

const app = express();

app.use(bodyParser.json());

app.use("/books", BookRouter);
app.use("/students", StudentRouter);
app.use("/workers", WorkersRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log("App is runnning on port: " + PORT);
});
