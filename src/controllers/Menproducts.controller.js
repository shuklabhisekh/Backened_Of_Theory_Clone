const express = require("express");

const router = express.Router();

const Product = require("../models/product.model");

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.send(product);
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({ cateoregy: "men" }).lean().exec();
    return res.render("ejs/menproducts", { products });

    // res.send(product);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
