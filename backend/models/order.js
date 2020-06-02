const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const productCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  count: Number,
  name: String,
  price: Number,
});

const ProductCart = mongoose.model("ProductCart", productCartSchema);
const orderSchema = new mongoose.Schema(
  {
    products: [productCartSchema],
    transaction_id: { type: String },
    amount: { type: Number },
    address: String,
    updated: Date,
    status: {
      type: String,
      default: "Recieved",
      enum: ["Cancellend", "Delivered", "Shipped", "Processing", "Recieved"],
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, ProductCart };
