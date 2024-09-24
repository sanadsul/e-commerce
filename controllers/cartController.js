import Cart from "../models/Cart.model.js";
import Product from "../models/Product.model.js";
import mongoose from "mongoose";


// Add to cart
const addToCart = async (req, res) => {
    const productId = req.params.id;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(productId) || userId === undefined) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            const newCart = new Cart({
                user: userId,
                items: [{ product: productId, quantity: 1 }],    
                totalPrice: product.price,      
            });
            await newCart.save();
            return res.status(200).json({ success: true, message: "Product added to cart", data: newCart });
        }

        const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
        if (itemIndex !== -1) {
            cart.items[itemIndex].quantity += 1;
            cart.totalPrice += product.price;
        } else {
            cart.items.push({ product: productId, quantity: 1 });
            cart.totalPrice += product.price;
        }
        await cart.save();
        return res.status(200).json({ success: true, message: "Product added to cart", data: cart });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
        };


// Get cart
const getCart = async (req, res) => {
    const userId = req.user.id;
    if (!userId) {
        return res.status(400).json({ success: false, message: "User not found" });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }
        return res.status(200).json({ success: true, message: "Cart found", data: cart });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};



export { addToCart, getCart };