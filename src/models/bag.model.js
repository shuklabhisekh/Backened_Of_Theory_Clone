const mongoose = require("mongoose");

const bagSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    quantity: { type: Number, default: 1 },
    price: Number,
    total: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("bag", bagSchema);
