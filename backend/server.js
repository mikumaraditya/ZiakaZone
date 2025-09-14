import express from 'express';

import dotenv from 'dotenv';
import connectDB from "./db/database.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoutes.js"
import authMiddleware from "./auth/auth.js"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;


connectDB();





app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());




app.use(authRoute);
app.get("/auth", authMiddleware, (req, res) => {
    res.status(200).json({ message: "You are already login" });  
  
});




app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT} 🔥`);
});
