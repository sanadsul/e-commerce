
import { validateProduct } from "../middlewares/ValidatorJoi.js";
import Product from "../models/Product.model.js";
import mongoose from "mongoose";

{/* create product */}
const createProduct =  async  (req, res) => {
  
    const validation = validateProduct(req.body);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid input data",
      errors: validation.message
    });
  }

  const { name, price, description, category, stock } = validation.data; 


    try {
        if (!name || !price || !description , !category || !stock) {
            return res.status(400).json({ success: false, message: "All field Required", error:error.message });
        }

        const existProduct = await Product.findOne({ name }).exec();
        if (existProduct) {
            return res.status(400).json({ success: false, message: "Product already exist name" });
        }
        


        const newProduct = new Product({ name, price, description, category, stock });
        await newProduct.save();
        return res.status(200).json({ success: true, message: "Product created successfully", data: newProduct });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error product", error: error.message });
    }
}

{/* get product by id */}

const getProduct = async (req, res) => {
    
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid id" });
    }

    try {
        const product = await Product.findById(id).lean().exec();

        if (!product) {
            return res.status(400).json({ success: false, message: "Product not found" });
        } 

        return res.status(200).json({ success: true, message: "Successfully get product", data: product });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }

}

{/* get all product */}

const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find().lean().exec();
        if (!products) {
            return res.status(400).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({ success: true, message: "All product", data: products });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

{/* update product */}
const updateProduct = async (req, res) => {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid id" });
    }
    
    const validation = validateProduct(req.body);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid input data",
      errors: validation.message
    });
  }

  const { name, price, description, category, stock } = validation.data; 


    try {
        const product = await Product.findById(id).lean().exec();
        if (!product) {
            return res.status(400).json({ success: false, message: "Product not found" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, description, category, stock }, { new: true });
        return res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

{/* delete product */}
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid id" });
    };

    try {
        const product = await Product.findById(id).lean().exec();

        if (!product) {
            return res.status(400).json({ success: false, message: "Product not found" });
        }

        await Product.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export { createProduct, getProduct, getAllProduct, updateProduct, deleteProduct };