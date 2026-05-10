import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import fs from "fs";
import connectDB from "./dbConfig/db.js";
import userRoute from "./routes/userRoute.js";
import productRoutes from "./routes/productRoute.js";

configDotenv();

const app = express();

// Create uploads folder if it doesn't exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
  console.log("Created uploads/ folder");
}

// Proper CORS
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Connect DB only once
connectDB();

app.use("/api/users", userRoute);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});