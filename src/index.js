const express = require('express');
const bodyParser = require('body-parser');
const BookRouter = require("./routes/books.route");

const app = express();

app.use(bodyParser.json());

app.use("/books", BookRouter);

const PORT = 3003;
app.listen(PORT, ()=> {
    console.log("App is runnning on port: " + PORT);
});