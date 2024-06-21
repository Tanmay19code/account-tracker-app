const mongoose = require("mongoose");
const { Schema } = mongoose;

const accountSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  short_name: {
    type: String,
  },
  description: {
    type: String,
  },
  balance: {
    type: Number,
    required: true,
  },

  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
  ],
  savings: [
    {
      type: Schema.Types.ObjectId,
      ref: "saving",
    },
  ],
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "transaction",
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Account = mongoose.model("account", accountSchema);
module.exports = Account;
