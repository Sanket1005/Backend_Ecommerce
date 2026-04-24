import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import cors from "cors";
import connectDB from "./dbConfig/db.js";
import userRoute from "./routes/userRoute.js"


const app = express();
configDotenv();


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send ("Hello World");
});
app.use("/api/users",userRoute),


connectDB();

const PORT = process.env.PORT || 5000;


app.listen (PORT, () => {
    console.log(`server is running in post ${PORT}`);
});