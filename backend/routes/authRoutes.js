import express from "express";
import{ z } from 'zod';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";
const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
      const reqBody = z.object({
        email: z.string()
          .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email format" })
          .min(3, { message: "Email must be at least 3 characters" })
          .max(50, { message: "Email must be less than 50 characters" }),
  
        password: z.string()
          .min(8, { message: "Password must be at least 8 characters long" })
          .refine((val) => /[A-Z]/.test(val), { message: "Password must contain at least one uppercase letter" })
          .refine((val) => /[a-z]/.test(val), { message: "Password must contain at least one lowercase letter" })
          .refine((val) => /[0-9]/.test(val), { message: "Password must contain at least one number" })
          .refine((val) => /[!@#$%^&*]/.test(val), { message: "Password must contain at least one special character (!@#$%^&*)" }),
      });
  
      const parsedData = await reqBody.safeParseAsync(req.body);
  
      if (!parsedData.success) {
        return res.status(400).json({
          message: parsedData.error.issues[0].message,
        });
      }
  
      const { email, password } = parsedData.data;
      const hashedPass = await bcrypt.hash(password, 10);
  
      await userModel.create({
        email: email,
        password: hashedPass,
      });
  
      res.status(201).json({
        message: "User signed up successfully ✅",
      });
  
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({
          message: "A user with this email already exists 🚨"
        });
      }
  
      console.error("Signup error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  router.post("/signin", async (req, res) => {
    try {
      const reqBody = z.object({
        email: z.string()
          .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email format" })
          .min(3, { message: "Email must be at least 3 characters" })
          .max(50, { message: "Email must be less than 50 characters" }),
  
        password: z.string()
          .min(8, { message: "Password must be at least 8 characters long" })
          .refine((val) => /[A-Z]/.test(val), { message: "Password must contain at least one uppercase letter" })
          .refine((val) => /[a-z]/.test(val), { message: "Password must contain at least one lowercase letter" })
          .refine((val) => /[0-9]/.test(val), { message: "Password must contain at least one number" })
          .refine((val) => /[!@#$%^&*]/.test(val), { message: "Password must contain at least one special character (!@#$%^&*)" }),
      });
  
      const parsedData = await reqBody.safeParseAsync(req.body);
  
      if (!parsedData.success) {
        return res.status(400).json({
          message: parsedData.error.issues[0].message,
        });
      }
  
      const { email, password } = parsedData.data;
  
      const user = await userModel.findOne({
        email: email
      }); 
  
      if (!user) {
        return res.status(400).json({ error: "Invalid email" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid password" });
      } else {
        const token = await jwt.sign( { id: user._id, email: user.email }, process.env.JWT_SECRET);
  
        res.cookie("token", token, {
          httpOnly: true,
          secure: false, 
          sameSite: "strict",
        });
        
        res.status(200).json({
          message: "User signed in successfully",
          success:true
        });
      }
  
    } catch (error) {
      res.status(400).json({ error: "User not found" });
    }
  });

  export default router;