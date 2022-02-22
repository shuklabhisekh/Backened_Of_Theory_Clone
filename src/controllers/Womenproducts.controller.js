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
    let products;
    const q = req.query.sorting;
    if (!q) {
      products = await Product.find({ cateoregy: "women" }).lean().exec();
    }
    if (q && q == "low") {
      products = await Product.find({ cateoregy: "women" })
        .sort({ price: 1 })
        .lean()
        .exec();
    } else if (q == "high") {
      products = await Product.find({ cateoregy: "women" })
        .sort({ price: -1 })
        .lean()
        .exec();
    }
    return res.render("ejs/womenproducts", { products });

    // res.send(product);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
