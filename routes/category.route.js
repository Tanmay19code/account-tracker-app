const express = require("express");
const router = express.Router();
const fetchUser = require("../middlewares/fetchuser.middleware");
const { createCategory } = require("../controllers/category.controller");

//% Route - 1:  POST - /api/category/create/:accountId
//% Description: Create a new category for a specific account of a specific user
router.post("/create/:accountId", fetchUser, createCategory);

module.exports = router;