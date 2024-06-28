const { Response } = require("../helper/helper");
const Account = require("../models/account.model");
const Saving = require("../models/saving.model");

const createSaving = async (req, res) => {
  const { name, description, amount, type } = req.body;
  const accountId = req.params.accountId;
  const createdBy = req.user;

  if (!name || !amount || !type) {
    return res
      .status(400)
      .send(Response(false, "Please fill all the fields", null));
  }
  try {
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).send(Response(false, "Account not found", null));
    }

    if (account.createdBy.toString() !== createdBy.toString()) {
      return res
        .status(403)
        .send(
          Response(false, "You are not authorized to perform this action", null)
        );
    }

    const saving = new Saving({
      name,
      description,
      amount,
      account: accountId,
      createdBy: createdBy.id,
      type,
    });

    const savedSaving = await saving.save();

    account.savings.push(savedSaving._id);
    await account.save();

    return res.status(201).send(Response(true, "Saving created", savedSaving));
  } catch (error) {
    console.log(error);
    return Response(false, 500, false, "Internal Server Error");
  }
};

const updateSaving = async (req, res) => {
  const { name, description, amount, type, strikethrough } = req.body;
  const savingId = req.params.savingId;
  const createdBy = req.user;

  try {
    const saving = await Saving.findById(savingId).populate("account");
    if (!saving) {
      return res.status(404).send(Response(false, "Saving not found", null));
    }

    if (saving.account.createdBy.toString() !== createdBy.toString()) {
      return res
        .status(403)
        .send(
          Response(false, "You are not authorized to perform this action", null)
        );
    }

    saving.name = name || saving.name;
    saving.description = description || saving.description;
    saving.amount = amount || saving.amount;
    saving.type = type || saving.type;
    saving.strikethrough = strikethrough || saving.strikethrough;

    await saving.depopulate("account");

    const updatedSaving = await saving.save();

    return res
      .status(200)
      .send(Response(true, "Saving updated", updatedSaving));
  } catch (error) {
    console.log(error);
    return Response(false, 500, false, "Internal Server Error");
  }
};

const getSaving = async (req, res) => {
  const savingId = req.params.savingId;
  const createdBy = req.user;

  try {
    const saving = await Saving.findById(savingId).populate("account");
    if (!saving) {
      return res.status(404).send(Response(false, "Saving not found", null));
    }

    if (saving.account.createdBy.toString() !== createdBy.toString()) {
      return res
        .status(403)
        .send(
          Response(false, "You are not authorized to perform this action", null)
        );
    }

    await saving.depopulate("account");

    return res.status(200).send(Response(true, "Saving found", saving));
  } catch (error) {
    console.log(error);
    return Response(false, 500, false, "Internal Server Error");
  }
};

const deleteSaving = async (req, res) => {
  const savingId = req.params.savingId;
  const createdBy = req.user;

  try {
    const saving = await Saving.findById(savingId);
    if (!saving) {
      return res.status(404).send(Response(false, "Saving not found", null));
    }

    const account = await Account.findById(saving.account);
    if (!account) {
      return res.status(404).send(Response(false, "Account not found", null));
    }

    if (account.createdBy.toString() !== createdBy.toString()) {
      return res
        .status(403)
        .send(
          Response(false, "You are not authorized to perform this action", null)
        );
    }

    account.savings = account.savings.filter(
      (saving) => saving.toString() !== savingId
    );
    await account.save();

    await Saving.findByIdAndDelete(savingId);

    return res.status(200).send(Response(true, "Saving deleted", saving));

  } catch (error) {
    console.log(error);
    return Response(false, 500, false, "Internal Server Error");
  }
};

module.exports = { createSaving, updateSaving, getSaving, deleteSaving };
