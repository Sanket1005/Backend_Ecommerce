import mongoose, { Types } from "mongoose";


const userSchema = new mongoose.Schema({
    Username: {
        Type: String,
        required: true,
    },
    Email: {
        Type: String,
        required: true,
    },
    Number: {
        Type: Number,
        required: true,
    },







})
