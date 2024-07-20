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

app.use(express.static(path.join(__dirname, "client", "build")));

app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/account", require("./routes/account.route"));
app.use("/api/category", require("./routes/category.route"));
app.use("/api/transaction", require("./routes/transaction.route"));
app.use("/api/saving", require("./routes/saving.route"));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve('views', 'client', 'build', 'index.html'));
});
 

app.listen(5000, () => {
  console.log(`Server is running on port ${PORT}`.yellow.italic.underline.bold);
});
