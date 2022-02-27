const express = require("express");

const router = express.Router();

const Product = require("../models/product.model");

router.get("/", async (req, res) => {
  try {
    const women = await Product.find({ type: "women" }).lean().exec();
    const men = await Product.find({ type: "Men" }).lean().exec();
    const acc = await Product.find({ type: "Accessories" }).lean().exec();
    const total = await Product.find().lean().exec();
    womenLength = women.length;
    menLength = men.length;
    accLength = acc.length;
    totalLength = total.length;
    return res.render("ejs/admin", {
      womenLength,
      menLength,
      accLength,
      totalLength,
    });
  } catch (err) {
    res.send(err);
  }
});

router.get("/productlist", async (req, res) => {
  try {
    const products = await Product.find().lean().exec();

    return res.render("ejs/adminproduct", { products });
  } catch (err) {
    res.send(err);
  }
});

router.get("/productadd", async (req, res) => {
  try {
    return res.render("ejs/adminproductadd");
  } catch (err) {
    res.send(err);
  }
});

router.get("/productedit", async (req, res) => {
  try {
    return res.render("ejs/adminproductedit");
  } catch (err) {
    return res.send(err.message);
  }
});

module.exports = router;
