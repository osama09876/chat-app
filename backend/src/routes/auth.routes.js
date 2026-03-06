import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);

export default router;
