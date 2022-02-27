const express = require("express");

const router = express.Router();

const Bag = require("../models/bag.model");

router.get("/", async (req, res) => {
  try {
    const bags = await Bag.find().populate("productId").lean().exec();
    return res.render("ejs/signup", { bags });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
