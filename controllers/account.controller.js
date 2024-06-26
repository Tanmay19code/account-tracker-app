const User = require("../models/user.model");
const Account = require("../models/account.model");
const { Response } = require("../helper/helper");


const createAccount = async (req, res) => {
  try {
    const userId = req.user;
    if (!userId) {
      return res.status(400).send(Response(false, "Invalid user", null));
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).send(Response(false, "User not found", null));
    }

    // Create account
    const { name, shortName, description, balance } = req.body;

    if (!name) {
      return res
        .status(400)
        .send(Response(false, "Please fill the name", null));
    }

    const newAccount = new Account({
      name,
      shortName,
      description,
      balance,
      createdBy: userId,
    });

    const savedAccount = await newAccount.save();

    if (!savedAccount) {
      return res.status(400).send(Response(false, "Account not created", null));
    }

    user.accounts.push(savedAccount._id);
    await user.save();

    return res
      .status(201)
      .send(Response(true, "Account created", savedAccount));
  } catch (error) {
    console.error(error);
    return res.status(500).send(Response(false, "Internal Server Error", null));
  }
};

const getAllAccounts = async (req, res) => {
  const userId = req.user;
  try {
    if (!userId) {
      return res.status(400).send(Response(false, "Invalid user", null));
    }

    const user = await User.findById(userId).select("accounts");

    if (!user) {
      return res.status(400).send(Response(false, "User not found", null));
    }

    const accounts = await user.populate("accounts");

    if (!accounts) {
      return res.status(400).send(Response(false, "Accounts not found", null));
    }

    return res.status(200).send(Response(true, "Accounts found", accounts));
  } catch (error) {
    console.error(error);
    return res.status(500).send(Response(false, "Internal Server Error", null));
  }
};

const getAccount = async (req, res) => {
  const userId = req.user;
  if (!userId) {
    return res.status(400).send(Response(false, "Invalid user", null));
  }
  try {
    const accountId = req.params.id;
    if (!accountId) {
      return res.status(400).send(Response(false, "Invalid account", null));
    }

    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(400).send(Response(false, "Account not found", null));
    }

    if (account.createdBy.toString() !== userId.toString()) {
      return res.status(400).send(Response(false, "Unauthorized Access", null));
    }

    return res.status(200).send(Response(true, "Account found", account));
  } catch (error) {
    console.error(error);
    return res.status(500).send(Response(false, "Internal Server Error", null));
  }
};

const updateAccount = async (req, res) => {
  const userId = req.user;
  if (!userId) {
    return res.status(400).send(Response(false, "Invalid user", null));
  }

  const accountId = req.params.id;
  if (!accountId) {
    return res.status(400).send(Response(false, "Invalid account", null));
  }
  try {
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(400).send(Response(false, "Account not found", null));
    }

    if (account.createdBy.toString() !== userId.toString()) {
      return res.status(400).send(Response(false, "Unauthorized Access", null));
    }

    const { name, shortName, description, balance } = req.body;

    if (!name) {
      return res
        .status(400)
        .send(Response(false, "Please fill the name", null));
    }

    const updatedAccount = await Account.findByIdAndUpdate(
      accountId,
      {
        name,
        shortName,
        description,
        balance,
      },
      { new: true }
    );

    if (!updatedAccount) {
      return res.status(400).send(Response(false, "Account not updated", null));
    }

    return res
      .status(200)
      .send(Response(true, "Account updated", updatedAccount));
  } catch (error) {
    console.error(error);
    return res.status(500).send(Response(false, "Internal Server Error", null));
  }
};

module.exports = { createAccount, getAllAccounts, getAccount, updateAccount };
