const express = require("express");
const router = express.Router();
const { registerUser, getUserById, loginUser, getUser } = require("../controllers/auth.controller");
const fetchUser = require("../middlewares/fetchuser.middleware");

//% Route - 1:  POST - /auth/register
//% Description: Register a new user
router.post("/register", registerUser);

//% Route - 2:  POST - /auth/getuserbyid
//% Description: Get user details by id
router.get("/getuserbyid/:id", getUserById);

//% Route - 3:  POST - /auth/login
//% Description: Login a user
router.post("/login", loginUser);

//% Route - 4:  POST - /auth/getuser
//% Description: Get user details by headers
router.get("/getuser", fetchUser, getUser);

module.exports = router;
