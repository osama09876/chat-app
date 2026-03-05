import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";
import {upload} from "../middlewares/upload.js"

const router = Router();

router.post("/register",upload.single('avatar'), registerUser);

export default router;
