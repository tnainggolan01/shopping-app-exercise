const conn = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getPosts = async () =>
  await conn.getDb().collection("posts").find({}).limit(50).toArray();

const getPostById = async (id) => {
  // console.log("services/getPostById:", id);
  return await conn
    .getDb()
    .collection("posts")
    .findOne({ _id: new ObjectId(id) });
};

const createPost = async (post) => {
  post.createdAt = new Date(Date.now()).toUTCString();
  const response = await conn.getDb().collection("posts").insertOne(post);
  // console.log("services/createPost:", response);
  return { ...post, _id: response.insertedId.toString() };
};

const updatePost = async (id, updated) =>
  await conn
    .getDb()
    .collection("posts")
    .updateOne({ _id: new ObjectId(id) }, { $set: { ...updated } });

const deletePost = async (id) => {
  // console.log("services/deletePost:", id);
  return await conn
    .getDb()
    .collection("posts")
    .deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
