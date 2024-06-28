const express = require("express");
const router = express.Router();
const fetchUser = require("../middlewares/fetchuser.middleware");
const {
  createSaving,
  updateSaving,
  getSaving,
  deleteSaving,
} = require("../controllers/saving.controller");

//% Route - 1:  POST - /api/saving/create/:accountId
//% Description: Create a new saving for a specific account
router.post("/create/:accountId", fetchUser, createSaving);

//% Route - 2:  PUT - /api/saving/update/:savingId
//% Description: Update a saving
router.put("/update/:savingId", fetchUser, updateSaving);

//% Route - 3:  GET - /api/saving/get/:savingId
//% Description: Get a saving
router.get("/get/:savingId", fetchUser, getSaving);

//% Route - 4:  DELETE - /api/saving/delete/:savingId
//% Description: Delete a saving
router.delete("/delete/:savingId", fetchUser, deleteSaving);

module.exports = router;
