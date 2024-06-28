const express = require("express");
const router = express.Router();
const fetchUser = require("../middlewares/fetchuser.middleware");
const {
  createAccount,
  getAllAccounts,
  getAccount,
  updateAccount,
  deleteAccount
} = require("../controllers/account.controller");

//% Route - 1:  GET - /api/account/create
//% Description: Create a new account for a specific user
router.post("/create", fetchUser, createAccount);

//% Route - 2:  GET - /api/account/getallaccounts
//% Description: Get all accounts of a specific user
router.get("/getallaccounts", fetchUser, getAllAccounts);

//% Route - 3:  GET - /api/account/getaccount/:id
//% Description: Get details of a specific account
router.get("/getaccount/:id", fetchUser, getAccount);

//% Route - 4:  PUT - /api/account/update/:id
//% Description: Update details of a specific account
router.put("/update/:id", fetchUser, updateAccount);

//% Route - 5:  DELETE - /api/account/delete/:id
//% Description: Delete a specific account
router.delete("/delete/:id", fetchUser, deleteAccount);


module.exports = router;
