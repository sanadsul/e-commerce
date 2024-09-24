import express from "express";
import { createProduct, getProduct, getAllProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

router.post('/create', createProduct);
router.get("/details/:id", getProduct);
router.get("/All", getAllProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export { router as ProductRouter }