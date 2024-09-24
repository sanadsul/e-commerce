import express from "express";
import { authRouter } from "./auth.js";
import { ProductRouter } from "./product.js";
import { orderRouter } from "./Order.js";
import { CartRouter } from "./Cart.js";


const router = express.Router();

router.use('/auth', authRouter);
router.use('/product', ProductRouter);
router.use('/order', orderRouter);
router.use('/cart', CartRouter);


export { router as indexRouter }