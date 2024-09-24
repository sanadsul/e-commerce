import mongoose from "mongoose";
import Order from "../models/Order.model.js";
import Cart from "../models/Cart.model.js";

   // Get my order
const getMyOrder = async (req, res) => {
    const userId = req.user.id;
     
    if (!userId) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    
    try {
      const orders = await Order.find({ user: userId }).populate('items.product');

      if (!orders) {
        return res.status(404).json({ message: 'Orders not found' });
      }

      return res.status(200).json({ message: 'Orders found', data: orders });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

   // Get order by id
const getOrderById = async (req, res) => {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid id" });
    }

    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(400).json({ success: false, message: "Order not found" });
        }

        return res.status(200).json({ success: true, message: "Order found", data: order });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}
   // Create order
const createOrder = async (req, res) => {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
      const cart = await Cart.findOne({ user: userId }).populate('items.product');
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const newOrder = new Order({
        user: userId,
        items: cart.items,
        totalPrice: cart.totalPrice,
        cart: cart._id,
      });
  
      await newOrder.save();
  
      // تنظيف السلة بعد إتمام الطلب
      cart.items = [];
      cart.totalPrice = 0;
      await cart.save();
  
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


   // Get all order
const getAllOrder = async (req, res) => {

    try {
        const orders = await Order.find() 
        if (!orders) {
            return res.status(400).json({ success: false, message: "Orders not found" });
        }
        return res.status(200).json({ success: true, message: "All orders", data: orders });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

   // Update order
const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(400).json({ success: false, message: "Order not found" });
        }
        order.status = status;
        const updatedOrder = await order.save();
        return res.status(200).json({ success: true, message: "Order updated", data: updatedOrder });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

   // Delete order
const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(400).json({ success: false, message: "Order not found" });
        }
        await order.remove();
        return res.status(200).json({ success: true, message: "Order deleted" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}




export { createOrder, getAllOrder, updateOrder, deleteOrder, getMyOrder, getOrderById };