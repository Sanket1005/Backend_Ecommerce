import express from "express";
import upload from "../middleware/imageMiddleware.js";



import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controllers/productControllers.js";

const router = express.Router();

router.post("/", upload.single("productImage"),createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);


export default router;