const conn = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getProducts = async () =>
  await conn.getDb().collection("products").find({}).limit(50).toArray();

const getProductById = async (id) => {
  // console.log("services/getProductById:", id);
  return await conn
    .getDb()
    .collection("products")
    .findOne({ _id: new ObjectId(id) });
};

const getProductByName = async (productName) => {
  // console.log("services/getProductByName:", productName);
  return await conn.getDb().collection("products").findOne({ productName });
};

const createProduct = async (product) => {
  product.createdAt = new Date(Date.now()).toUTCString();
  const response = await conn.getDb().collection("products").insertOne(product);
  // console.log("services/createProduct:", response);
  return { ...product, _id: response.insertedId.toString() };
};

const updateProduct = async (id, updated) =>
  await conn
    .getDb()
    .collection("products")
    .updateOne({ _id: new ObjectId(id) }, { $set: { ...updated } });

const deleteProduct = async (id) => {
  // console.log("services/deleteProduct:", id);
  return await conn
    .getDb()
    .collection("products")
    .deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  getProducts,
  getProductById,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct,
};
