const express = require("express");


const Product = require("../models/admin.model");

const router = express.Router();


router.post("", async (req, res) => {
  try {
    const product = await Product.create(
        req.body
    );
      return res.send(product);
      
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


router.get("", async (req, res) => {
  try {
    const products = await Product.find().lean().exec();

    return res.send(products);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:category",async(req,res)=>{
    try {
        const product = await Product.find({category:req.params.category}).lean().exec()
        return res.send(product)
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

router.get("/:id",async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id).lean().exec();
        return res.send(product)
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});



router.patch("",async(req,res)=>{
    try {
       
            const product = await Product.findOneAndUpdate({  name: req.query.name },req.body , { new: true })
            res.send(product)
        
       
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
})

router.delete("",async(req,res)=>{
    try {
        const product = await Product.findOneAndDelete({  name: req.query.name })
        res.send(product)
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
})

module.exports = router;