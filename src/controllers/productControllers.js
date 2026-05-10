import Product from "../Models/productModels.js";

export const createProduct = async (req, res) => {
    try{
        const {
            productName,
            price,
            description,
            category,
            rating,
            productStock,
        } = req.body;
        console.log(req.body)
        const productImage = req.file.path;

        if (
            !productImage ||
            !productName ||
            !description ||
            !price ||
            !rating ||
            !productStock
        ){
            return res.status(400).json({message: "All field are required" });
        }



        const product = new Product ({
            productName,
            productImage,
            price,
            description,
            category,
            rating,
            productStock,
        })

        await product.save();

        res.status(201).json({
            message: "Product created",
            product
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProducts = async ( req, res) => {
    try {
        const product = await Product.find();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updated);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Product deleted" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const addReview = async (req, res) => {
    try {
        const { user, comment, rating } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();

        res.status(201).json({
            message: "Review added",
            product
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};