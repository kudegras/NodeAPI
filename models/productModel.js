const mongoose = require("mongoose");

// adding new fixes vs code autocomplete error
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a product name"],
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
