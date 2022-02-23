const express = require("express")


const connect = require("./configs/db");

const productController = require("./controller/product.controller");

const app = express();

app.use(express.json());

app.use("/products", productController);

app.listen(4000, async () => {
  try {
    await connect();
    console.log("listening on port 4000");
  } catch (err) {
    console.error(err.message);
  }
});

