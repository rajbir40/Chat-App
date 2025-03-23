import express from "express";
import {signup,login,logout,checkingAuth} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/check",checkingAuth);

export default router;
