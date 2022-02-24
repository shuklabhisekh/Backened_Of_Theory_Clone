const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: String },
  images: [{ type: String }],
  category: { type: String },
  type: { type: String },
});

module.exports = mongoose.model("products", productSchema);
