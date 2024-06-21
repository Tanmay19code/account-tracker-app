const mongoose = require("mongoose");
const { Schema } = mongoose;

const savingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: "account",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    required: true,
  },
  strikethrough: {
    type: Boolean,
    default: false,
  },
});

const Saving = mongoose.model("saving", savingSchema);
module.exports = Saving;
