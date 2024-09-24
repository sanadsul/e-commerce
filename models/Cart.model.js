import mongoose from "mongoose";

 /* Cart Model */
const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 },
  });
  
  const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema],
    totalPrice: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now },
  });
  
 const Cart = mongoose.model('Cart', cartSchema);

 export default Cart;