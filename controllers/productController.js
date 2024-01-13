const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// get all products
const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// get single product by id
const getProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        // res.status(500).json({ message: error.message });
        // doesn't work because async, use async error handler instead
        res.status(500);
        throw new Error(error.message);
    }
});

// create a product
const createProduct = asyncHandler(async (req, res) => {
    // console.log(req.body)
    // res.send(req.body)
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// update a product
const updateProduct = asyncHandler(async (req, res) => {
    try {
        // also available through req.params.id ?
        // console.log(req.params);
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        // product can't be find in DB
        if (!product) {
            res.status(404);
            throw new Error(`cannot find any product with ID ${id}`);
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// delete a product
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(404);
            throw new Error(`cannot find any product with ID ${id}`);
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
