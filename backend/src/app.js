import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("AI Website Builder Backend is running!");
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
