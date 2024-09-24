import express from "express";
import { createOrder, getAllOrder, updateOrder, deleteOrder, getMyOrder, getOrderById } from "../controllers/orderController.js";
import { isAuthenticate } from "../middlewares/isAuthenticate.js";

const router = express.Router();


router.post("/create",isAuthenticate, createOrder);
router.get("/details/:id",isAuthenticate, getOrderById);
router.get("/all",isAuthenticate, getAllOrder);
router.put("/update/:id",isAuthenticate, updateOrder);
router.delete("/delete/:id",isAuthenticate, deleteOrder);
router.get("/myorder",isAuthenticate, getMyOrder);


export { router as orderRouter };
