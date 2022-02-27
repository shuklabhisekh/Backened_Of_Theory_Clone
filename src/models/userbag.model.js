const mongoose = require("mongoose");

const userbagSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        quantity: { type: Number, default: 1 },
        price: Number,
        total: Number,
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("userbag", userbagSchema);
