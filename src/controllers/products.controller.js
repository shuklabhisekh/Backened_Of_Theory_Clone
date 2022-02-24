const express = require("express");

const router = express.Router();

const Product = require("../models/product.model");
const Bag = require("../models/bag.model");

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean().exec();
    const bags = await Bag.find().populate("productId").lean().exec();
    return res.render("ejs/productdetail", { product, bags });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
