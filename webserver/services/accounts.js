const conn = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAccounts = async () =>
  await conn.getDb().collection("accounts").find({}).limit(50).toArray();

const getAccountById = async (id) => {
  // console.log("services/getAccountById:", id);
  return await conn
    .getDb()
    .collection("accounts")
    .findOne({ _id: new ObjectId(id) });
};

const getAccountByEmail = async (email) => {
  // console.log("services/getAccountByEmail:", email);
  return await conn.getDb().collection("accounts").findOne({ email });
};

const createAccount = async (account) => {
  account.createdAt = new Date(Date.now()).toUTCString();
  const response = await conn.getDb().collection("accounts").insertOne(account);
  // console.log("services/createAccount:", response);
  return { ...account, _id: response.insertedId.toString() };
};

const updateAccount = async (id, updated) =>
  await conn
    .getDb()
    .collection("accounts")
    .updateOne({ _id: new ObjectId(id) }, { $set: { ...updated } });

const deleteAccount = async (id) => {
  // console.log("services/deleteAccount:", id);
  return await conn
    .getDb()
    .collection("accounts")
    .deleteOne({ _id: new ObjectId(id) });
};

const loginAccount = async (account) => {
  try {
    const { email, password } = account;
    // console.log("services/loginAccount:", account);
    return await conn
      .getDb()
      .collection("accounts")
      .find({ email, password })
      .toArray();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAccounts,
  getAccountById,
  getAccountByEmail,
  createAccount,
  updateAccount,
  deleteAccount,
  loginAccount,
};
