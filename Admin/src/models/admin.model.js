const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
      name: { type: String, required: true }, 
      price: { type: Number, required: true },
      category: { type: String, required: true },
      type : { type: String, required: true},
      image1: { type: String,required:true },
      image2: { type: String, required:true },

    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("product", productSchema); 
  
