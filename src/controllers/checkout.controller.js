const express = require("express");

const router = express.Router();

const Bag = require("../models/bag.model");

router.get("/", async (req, res) => {
  try {
    const bags = await Bag.find().populate("productId").lean().exec();
    var sum = 0;
    bags.map((bag) => {
      sum += +bag.productId.price.slice(1).replace(",", "") * bag.quantity;
    });
    return res.render("ejs/checkout", { bags, sum });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
