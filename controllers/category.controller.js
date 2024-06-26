const { Response } = require("../helper/helper");
const Account = require("../models/account.model");
const Category = require("../models/category.model");

const createCategory = async (req, res) => {
  const { accountId } = req.params;
  const userId = req.user;
  const { name, description, colorCode } = req.body;
  try {
    if (!userId) {
      return res.status(400).send(Response(false, "Invalid user", null));
    }

    if (!accountId) {
      return res.status(400).send(Response(false, "Invalid account", null));
    }

    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(400).send(Response(false, "Invalid account", null));
    }

    if (!name) {
      return res
        .status(400)
        .send(Response(false, "Please fill the name", null));
    }

    const category = new Category({
      name,
      description,
      createdBy: userId,
      colorCode,
      account: accountId,
    });

    const savedCategory = await category.save();
    if (!savedCategory) {
      return res.status(400).send(Response(false, "Category not saved", null));
    }

    account.categories.push(savedCategory._id);
    await account.save();

    return res.status(200).send(Response(true, "Category created", category));
  } catch (err) {
    return res.status(400).send(Response(false, err.message, null));
  }
};

module.exports = { createCategory };
