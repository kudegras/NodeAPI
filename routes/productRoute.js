const express = require("express");
const Product = require("../models/productModel");

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

// CREATE
router.post("/", createProduct);

// READ
router.get("/", getProducts);

router.get("/:id", getProduct);

// UPDATE
router.put("/:id", updateProduct);

// DELETE
router.delete("/:id", deleteProduct);

module.exports = router;
