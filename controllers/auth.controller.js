const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const Response = (success, message, data) => {
  return {
    success: success,
    message: message,
    data: data,
  };
};

const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    return res
      .status(400)
      .send(Response(false, "Please fill in all fields", null));
  }

  if (password !== confirmPassword) {
    return res
      .status(400)
      .send(Response(false, "Passwords do not match", null));
  }

  try {
    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send(Response(false, "User already exists", null));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Remove the password field from the response data
    newUser.password = undefined;

    return res.status(201).send(Response(true, "User registered", newUser));
  } catch (error) {
    console.error(error);
    return res.status(500).send(Response(false, "Internal Server Error", null));
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).send(Response(false, "User not found", null));
    }

    return res.status(200).send(Response(true, "User found", user));
  } catch (error) {
    console.error(error);
    return res.status(500).send(Response(false, "Internal Server Error", null));
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send(Response(false, "Please fill in all fields", null));
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send(Response(false, "User does not exist", null));
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).send(Response(false, "Invalid credentials", null));
    }

    // Create a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    if (!token)
      return res
        .status(500)
        .send(Response(false, "Internal Server Error", null));

    // send the token in response
    return res.status(200).send(Response(true, "User logged in", { token }));
  } catch (error) {
    console.error(error);
    return res.status(500).send(Response(false, "Internal Server Error", null));
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).send(Response(false, "User not found", null));
    }
    return res.status(200).send(Response(true, "User found", user));
  } catch (error) {
    console.error(error);
    return res.status(500).send(Response(false, "Internal Server Error", null));
  }
};

module.exports = { registerUser, getUserById, loginUser, getUser };
