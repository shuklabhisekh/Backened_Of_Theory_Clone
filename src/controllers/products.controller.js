const express = require("express");

const router = express.Router();

const Product = require("../models/product.model");

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.send(product);
  } catch (err) {
    return res.send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.status(200).send(product);
  } catch (err) {
    return res.send(err.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
