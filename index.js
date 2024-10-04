const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db/connect");
const router = require("./routers/createRouters.js")();
const app = express();

dotenv.config();
db.connect();

app.use((req, res, next) => {
  const { method, path } = req;

  console.log(
    `New request to: ${method} ${path} at ${new Date().toISOString()}`
    // req
  );

  next();
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

// Use the client-side public folder for static files
app.use(express.static(__dirname + "/webclient/build"));

// Render the React app for any path
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/webclient/build/index.html");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
