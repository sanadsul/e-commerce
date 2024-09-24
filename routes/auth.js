import express from "express"; 
import { Register, Login, Dashboard } from "../controllers/auth.Controller.js";
import { isAuthenticate } from "../middlewares/isAuthenticate.js";

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.get("/dashboard/:id",isAuthenticate, Dashboard);


export { router as authRouter }