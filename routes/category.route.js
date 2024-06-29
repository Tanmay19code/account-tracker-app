const express = require("express");
const router = express.Router();
const fetchUser = require("../middlewares/fetchuser.middleware");
const { createCategory, getAllCategories, getCategory, updateCategory } = require("../controllers/category.controller");

//% Route - 1:  POST - /api/category/create/:accountId
//% Description: Create a new category for a specific account of a specific user
router.post("/create/:accountId", fetchUser, createCategory);

//% Route - 2:  GET - /api/category/getall/:accountId
//% Description: Get all categories of a specific account of a specific user
router.get("/getall/:accountId", fetchUser, getAllCategories);

//% Route - 3:  GET - /api/category/get/:categoryId
//% Description: Get a specific category of a specific user
router.get("/get/:categoryId", fetchUser, getCategory);

//% Route - 4:  PUT - /api/category/update/:categoryId
//% Description: Update a specific category of a specific user
router.put("/update/:categoryId", fetchUser, updateCategory);

module.exports = router;