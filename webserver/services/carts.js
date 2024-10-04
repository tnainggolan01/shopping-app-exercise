const conn = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getActiveCartByAccountId = async (id) => {
  // console.log("services/getActiveCartByAccountId:", id);
  return await conn
    .getDb()
    .collection("carts")
    .findOne({ accountId: id, status: "active" });
};

const addItemToAccountCart = async (accountId, product) => {
  // console.log("services/addItemToAccountCart:", accountId, product);
  let productList = [product];
  let createdAt = new Date(Date.now()).toUTCString();
  let status = "active";

  let newCart = { accountId, productList, status, createdAt };
  const response = await conn.getDb().collection("carts").insertOne(newCart);
  // console.log("services/addItemToAccountCart:", response);
  return { ...newCart, _id: response.insertedId.toString() };
};

const updateAccountCart = async (accountId, status, updated) => {
  // console.log("services/updateAccountCart:", accountId, status, updated);

  const response = await conn
    .getDb()
    .collection("carts")
    .updateOne({ accountId, status }, { $set: { ...updated } });
  // console.log("services/updateAccountCart:", response);
  return response;
};

const deleteItemInAccountCart = async (id) => {
  // console.log("services/deleteItemInAccountCart:", id);
  return await conn.getDb().collection("carts").deleteOne({ accountId: id });
};

module.exports = {
  getActiveCartByAccountId,
  addItemToAccountCart,
  updateAccountCart,
  deleteItemInAccountCart,
};
