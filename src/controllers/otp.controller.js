const express = require("express");

const router = express.Router();

const Bag = require("../models/bag.model");

router.get("/", async (req, res) => {
  try {
    // const bags = await Bag.find().populate("productId").lean().exec();
    // console.log("opt");
    // return res.send("ok");
    return res.render("ejs/otp");
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
