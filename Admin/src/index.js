const express = require("express")

const cors = require("cors");

const connect = require("./configs/db");

const productController = require("./controller/admin.controller");

const app = express();
app.use(cors());

app.use(express.json());

app.use("/products", productController);

app.listen(4006, async () => {
  try {
    await connect();
    console.log("listening on port 4006");
  } catch (err) {
    console.error(err.message);
  }
});