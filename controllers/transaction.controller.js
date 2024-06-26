const { Response } = require("../helper/helper");
const Account = require("../models/account.model");
const Transaction = require("../models/transaction.model");

const createTransaction = async (req, res) => {
  const { date, note, category, amount, type } = req.body;
  const createdBy = req.user;

  if (!createdBy) {
    return res.status(400).send(Response(false, "Invalid user", null));
  }

  try {
    const accountId = req.params.accountId;
    if (!accountId) {
      return res.status(400).send(Response(false, "Invalid account", null));
    }

    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(400).send(Response(false, "Invalid account", null));
    }

    if (!category) {
      return res.status(400).send(Response(false, "Invalid category", null));
    }

    if (!account?.categories?.includes(category)) {
      return res
        .status(400)
        .send(Response(false, "Category not available", null));
    }

    if (!amount) {
      return res
        .status(400)
        .send(Response(false, "Please fill the amount", null));
    }

    if (!type) {
      return res
        .status(400)
        .send(Response(false, "Please fill the type", null));
    }
    let transactionType = type.toLowerCase();
    if (transactionType === "credit") {
      updatedAmount = Math.abs(amount);
    } else if (transactionType === "debit") {
      updatedAmount = -Math.abs(amount);
    } else {
      return res.status(400).send(Response(false, "Invalid type", null));
    }

    const newTransaction = new Transaction({
      date,
      note,
      account: accountId,
      category,
      amount: updatedAmount,
      createdBy,
      type: transactionType,
    });

    const savedTransaction = await newTransaction.save();
    if (!savedTransaction) {
      return res
        .status(400)
        .send(Response(false, "Transaction not saved", null));
    }

    account.transactions.push(savedTransaction._id);
    account.balance += updatedAmount;
    await account.save();

    return res
      .status(200)
      .send(Response(true, "Transaction created", savedTransaction));
  } catch (err) {
    return res.status(400).send(Response(false, err.message, null));
  }
};

const getTransaction = async (req, res) => {
  const transactionId = req.params.transactionId;
  const createdBy = req.user;

  if (!createdBy) {
    return res.status(400).send(Response(false, "Invalid user", null));
  }

  try {
    if (!transactionId) {
      return res.status(400).send(Response(false, "Invalid transaction", null));
    }

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(400).send(Response(false, "Invalid transaction", null));
    }

    if (transaction.createdBy.toString() !== createdBy.toString()) {
      return res.status(401).send(Response(false, "Unauthorized access", null));
    }

    return res
      .status(200)
      .send(Response(true, "Transaction found", transaction));
  } catch (err) {
    return res.status(400).send(Response(false, err.message, null));
  }
};

const updateTransaction = async (req, res) => {
  const { date, note, category, amount, type } = req.body;
  const createdBy = req.user;

  if (!createdBy) {
    return res.status(400).send(Response(false, "Invalid user", null));
  }

  try {
    const transactionId = req.params.transactionId;
    if (!transactionId) {
      return res.status(400).send(Response(false, "Invalid transaction", null));
    }

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(400).send(Response(false, "Invalid transaction", null));
    }

    const account = await Account.findById(transaction.account);

    if (!account) {
      return res.status(400).send(Response(false, "Invalid account", null));
    }

    if (category && !account?.categories?.includes(category)) {
      return res
        .status(400)
        .send(Response(false, "Category not available", null));
    }

    let updatedAmount = 0;

    if (amount && !type) {
      let tempAmount = amount;
      if (transaction.amount < 0) {
        tempAmount = -Math.abs(amount);
      }
      updatedAmount = account.balance - transaction.amount + tempAmount;
      account.balance = updatedAmount;
      transaction.amount = tempAmount;
    } else if (!amount && type) {
      if (
        (type.toLowerCase() != transaction.type &&
          type.toLowerCase() == "debit") ||
        type.toLowerCase() == "credit"
      ) {
        updatedAmount =
          account.balance - transaction.amount - transaction.amount;
        transaction.amount = -transaction.amount;
        transaction.type = type.toLowerCase();

        account.balance = updatedAmount;
        transaction.type = type.toLowerCase();
      }
    } else if (amount && type) {
      let newAmount =
        type.toLowerCase() == "credit" ? Math.abs(amount) : -Math.abs(amount);
      updatedAmount = account.balance - transaction.amount + newAmount;
      account.balance = updatedAmount;
      transaction.amount = newAmount;
      transaction.type = type.toLowerCase();
    }

    transaction.date = date || transaction.date;
    transaction.note = note || transaction.note;
    transaction.category = category || transaction.category;

    await transaction.save();
    await account.save();

    return res
      .status(200)
      .send(Response(true, "Transaction updated", transaction));
  } catch (err) {
    return res.status(400).send(Response(false, err.message, null));
  }
};

const deleteTransaction = async (req, res) => {
  const createdBy = req.user;

  if (!createdBy) {
    return res.status(400).send(Response(false, "Invalid user", null));
  }

  try {
    const transactionId = req.params.transactionId;
    if (!transactionId) {
      return res.status(400).send(Response(false, "Invalid transaction", null));
    }

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(400).send(Response(false, "Invalid transaction", null));
    }

    if (transaction.createdBy.toString() !== createdBy.toString()) {
      return res.status(401).send(Response(false, "Unauthorized access", null));
    }

    const account = await Account.findById(transaction.account);

    if (!account) {
      return res.status(400).send(Response(false, "Invalid account", null));
    }

    account.balance = account.balance - transaction.amount;

    // Remove transaction from account
    account.transactions = account.transactions.filter(
      (id) => id.toString() !== transactionId.toString()
    );

    await account.save();
    await Transaction.findByIdAndDelete(transactionId);

    return res
      .status(200)
      .send(Response(true, "Transaction deleted", transaction));
  } catch (err) {
    return res.status(400).send(Response(false, err.message, null));
  }
};

module.exports = {
  createTransaction,
  updateTransaction,
  getTransaction,
  deleteTransaction,
};
