const express = require("express");
const router = express.Router();
const { registerUser, getUserById, loginUser } = require("../controllers/auth.controller");

//% Route - 1:  POST - /auth/register
//% Description: Register a new user
router.post("/register", registerUser);

//% Route - 2:  POST - /auth/getuser
//% Description: Get user details
router.get("/getuserbyid/:id", getUserById);

//% Route - 3:  POST - /auth/login
//% Description: Login a user
router.post("/login", loginUser);

module.exports = router;
