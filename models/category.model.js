const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: "account",
  },
  colorCode: {
    type: String,
  },
});

const Category = mongoose.model("category", categorySchema);
module.exports = Category;
