const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  note: {
    type: String,
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: "account",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
  amount: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // type is enum of "credit" or "debit" or "transfer"
  type: {
    type: String,
    required: true,
  },
});

const Transaction = mongoose.model("transaction", transactionSchema);
module.exports = Transaction;
