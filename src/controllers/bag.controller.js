const express = require("express");

const router = express.Router();
const Bag = require("../models/bag.model");

router.post("/", async (req, res) => {
  try {
    const bag = await Bag.create(req.body);
    return res.send(bag);
  } catch (err) {
    return res.send(err.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const bag = await Bag.findByIdAndUpdate(req.params.id, req.body)
      .lean()
      .exec();
    return res.send(bag);
  } catch (err) {
    return res.send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const bag = await Bag.findByIdAndDelete(req.params.id);
    console.log(bag);
  } catch (err) {
    return res.send(err.message);
  }
});

router.get("/", async (req, res) => {
  const bags = await Bag.find().populate("productId").lean().exec();
  var sum = 0;
  bags.map((bag) => {
    sum += +bag.productId.price.slice(1).replace(",", "") * bag.quantity;
  });

  sum = "₹" + sum + ".00";
  return res.render("ejs/AddCart", { bags, sum });
});

module.exports = router;
