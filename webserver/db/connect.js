const { MongoClient } = require("mongodb");

const dotenv = require("dotenv");
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
let connection;
let db;

module.exports = {
  connect: async function () {
    connection = await client.connect();
    console.log("Database connected successfully");
    db = connection.db("fullstack");
  },
  getDb: function () {
    return db;
  },
};
