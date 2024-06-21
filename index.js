const express = require("express");
const app = express();
const morgan = require("morgan");
const connectToMongo = require("./database/db");
require("dotenv").config({ path: "./.env" });

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectToMongo();


app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", require("./routes/auth.route"));



app.listen(5000, () => {
  console.log(`Server is running on port ${PORT}`.yellow.italic.underline.bold);
});
