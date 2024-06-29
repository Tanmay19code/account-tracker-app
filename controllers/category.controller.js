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

const getAllCategories = async (req, res) => {
  const { accountId } = req.params;
  try {
    const categories = await Category.find({ account: accountId });

    return res.status(200).send(Response(true, "Categories", categories));
  } catch (err) {
    return res.status(400).send(Response(false, err.message, null));
  }
};

const getCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const createdBy = req.user;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).send(Response(false, "Category not found", null));
    }

    if (category.createdBy.toString() !== createdBy.toString()) {
      return res.status(400).send(Response(false, "Invalid user", null));
    }

    return res.status(200).send(Response(true, "Category", category));
  } catch (err) {
    console.log(err);
    return res.status(400).send(Response(false, err.message, null));
  }
};

const updateCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  const { name, description, colorCode } = req.body;
  try {
    const createdBy = req.user;

    const category = await Category.findById(categoryId);

    if (category.createdBy.toString() !== createdBy.toString()) {
      return res.status(400).send(Response(false, "Invalid user", null));
    }

    category.name = name || category.name;
    category.description = description || category.description;
    category.colorCode = colorCode || category.colorCode;

    const updatedCategory = await category.save();
    if (!updatedCategory) {
      return res
        .status(400)
        .send(Response(false, "Category not updated", null));
    }

    return res
      .status(200)
      .send(Response(true, "Category updated", updatedCategory));
  } catch (err) {
    console.log(err);
    return res.status(400).send(Response(false, err.message, null));
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
};
