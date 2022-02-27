const express = require("express");

const router = express.Router();

const Product = require("../models/product.model");
const Bag = require("../models/bag.model");
// router.post("/", async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.send(product);
//   } catch (err) {
//     res.send(err.message);
//   }
// });

router.get("/", async (req, res) => {
  try {
    const searchField = req.query.search;
    const products = await Product.find({
      $or: [
        { name: { $regex: searchField, $options: "$i" } },
        { category: { $regex: searchField, $options: "$i" } },
      ],
    })
      .lean()
      .exec();

    const bags = await Bag.find().populate("productId").lean().exec();
    return res.render("ejs/searchresult", { products, searchField, bags });

    // res.send(product);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
