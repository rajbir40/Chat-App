import express from "express";
import { authMiddleware } from "./auth.middleware";
import { getUserforSidebar , getMessages} from "../controllers/message.controller";

const router = express.Router();

router.get("/users", authMiddleware, getUserforSidebar);
router.get("/messages/:id", authMiddleware, getMessages);

export default router;