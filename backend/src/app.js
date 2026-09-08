import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

connectDB();
// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("AI Website Builder Backend is running!");
});

// Start server
const PORT = process.env.MONGODB_URI | 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
