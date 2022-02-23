const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
      name: { type: String, required: true }, 
      price: { type: Number, required: true },
      category: { type: String, required: true },
     type : { type: String, required: true},
      images: [{ type: String }],
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
  const Product = mongoose.model("product", productSchema); 
  
  module.exports = Product
  