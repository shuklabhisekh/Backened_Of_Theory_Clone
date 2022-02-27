const express = require("express");

const router = express.Router();
const Userbag = require("../models/userbag.model");
const Bag = require("../models/bag.model");
router.post("/", async (req, res) => {
  try {
    const userbag = await Userbag.create(req.body);

    const bag = await Bag.find().lean().exec();
    for (var i = 0; i < bag.length; i++) {
      b = await Bag.findByIdAndDelete(bag[i]._id);
    }
    // console.log(bag);

    return res.send(userbag);
  } catch (err) {
    return res.send(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const userbag = await Userbag.find().lean().exec();
    return res.send(userbag);
  } catch (err) {
    return res.send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userbag = await Userbag.findById(req.params.id).lean().exec();
    var userbagproduct = userbag.products;
    for (var i = 0; i < userbagproduct.length; i++) {
      b = await Bag.create(userbagproduct[i]);
    }
    return res.send(userbag);
  } catch (err) {
    return res.send(err.message);
  }
});

module.exports = router;
