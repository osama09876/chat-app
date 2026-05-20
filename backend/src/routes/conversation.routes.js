import {
  createGroupConversation,
  createPrivateConversation,
} from "../controllers/conversation.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { Router } from "express";

const router = Router();

router.post("/private", verifyJWT, createPrivateConversation);
router.post("/group", verifyJWT, createGroupConversation);

export default router;
