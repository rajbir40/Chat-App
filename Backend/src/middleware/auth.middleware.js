import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export async function authMiddleware(req, res, next) {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode.userId).select("-password");
        if(!user){
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log("Error in auth middleware", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}