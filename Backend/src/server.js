import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import {app,server} from "./lib/socket.js";
import cors from "cors";
import cookieParser from "cookie-parser";
 
dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

app.use("/api/auth",authRoutes);

server.listen(PORT,()=>{
    console.log("Running on port:"+PORT);
    connectDB();
})

