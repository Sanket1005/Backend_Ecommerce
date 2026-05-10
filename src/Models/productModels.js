import mongoose, { mongo } from "mongoose";


const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    productStock: {
        type : Number,
        required: true,
    },
})

const Product = mongoose.model("Product", productSchema);

export default Product; 