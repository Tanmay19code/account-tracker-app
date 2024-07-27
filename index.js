const express = require("express");
const app = express();
const morgan = require("morgan");
const connectToMongo = require("./database/db");
require("dotenv").config({ path: "./.env" });
const path = require("path");

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectToMongo();

app.use(morgan("dev"));
app.use(express.json());

// Path to the build directory
const buildPath = path.join(__dirname, "views", "client", "build");

// Serve static files from the React app build directory
app.use(express.static(buildPath));

console.log(`Static files served from: ${buildPath}`);

app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/account", require("./routes/account.route"));
app.use("/api/category", require("./routes/category.route"));
app.use("/api/transaction", require("./routes/transaction.route"));
app.use("/api/saving", require("./routes/saving.route"));

app.get("/test", (req, res) => {
  res.send("Hello World");
});

// Catch-all route to serve the React app
app.get("/*", (req, res) => {
  const resolvedPath = path.resolve(buildPath, "index.html");
  console.log(`Serving file from: ${resolvedPath}`);
  res.sendFile(resolvedPath);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.italic.underline.bold);
});
