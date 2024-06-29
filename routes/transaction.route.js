const express = require("express");
const router = express.Router();
const fetchUser = require("../middlewares/fetchuser.middleware");
const { createTransaction, updateTransaction, getTransaction, deleteTransaction, getTransactionsInCategory } = require("../controllers/transaction.controller");

//% Route - 1:  GET - /api/transaction/create/:accountId
//% Description: Create a new transaction for a specific account
router.post("/create/:accountId", fetchUser, createTransaction);

//% Route - 2:  GET - /api/transaction/update/:transactionId
//% Description: Update a transaction
router.put("/update/:transactionId", fetchUser, updateTransaction);

//% Route - 3:  GET - /api/transaction/read/:transactionId
//% Description: Get details of a specific transaction
router.get("/read/:transactionId", fetchUser, getTransaction);

//% Route - 4:  GET - /api/transaction/delete/:transactionId
//% Description: Delete a transaction
router.delete("/delete/:transactionId", fetchUser, deleteTransaction);

//% Route - 5:  GET - /api/transaction/getTransactionsInCategory/:accountId/:categoryId
//% Description: Get all transactions in a specific category
router.get("/getTransactionsInCategory/:accountId/:categoryId", fetchUser, getTransactionsInCategory);

module.exports = router;