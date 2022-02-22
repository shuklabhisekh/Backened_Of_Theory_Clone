const express = require("express");

const {
  upload,
  uploadMultiple,
} = require("../middlewares/file-upload");

const Product = require("../model/product.model");

const router = express.Router();


router.post("/multiple", uploadMultiple("images"), async (req, res) => {
  try {
    const filePaths = req.files.map((file) => file.path);
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      type: req.body.type,
      images: filePaths,
    });

    return res.send(product);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


router.get("", async (req, res) => {
  try {
    const products = await Product.find().lean().exec();

    return res.send({ products });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
