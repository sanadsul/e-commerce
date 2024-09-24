import mongoose from "mongoose";

/* Order Model */
const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Pending' },  
  createdAt: { type: Date, default: Date.now },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },  
});


const Order = mongoose.model("Order", orderSchema);
export default Order;
