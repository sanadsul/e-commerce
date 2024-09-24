import express from "express";
import { addToCart , getCart } from "../controllers/cartController.js";
import { isAuthenticate } from "../middlewares/isAuthenticate.js";


const router = express.Router();

router.post('/add/:id',isAuthenticate, addToCart);
router.get('/get/:id', isAuthenticate ,getCart);


export { router as CartRouter }