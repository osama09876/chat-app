import { Router } from "express";
import {
  loginUser,
  registerUser,
  userLogout,
} from "../controllers/auth.controller.js";
import { upload } from "../middlewares/upload.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, userLogout);

export default router;
