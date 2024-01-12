const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
    res.send("Hello Node API");
});

app.get("/blog", (req, res) => {
    res.send("Hello Blog, My name is Meursault");
});

// CREATE
app.post("/products", async (req, res) => {
    // console.log(req.body)
    // res.send(req.body)
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// READ
app.get("/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE
app.put("/products/:id", async (req, res) => {
    try {
        // also available through req.params.id ?
        // console.log(req.params);
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        // product can't be find in DB
        if (!product) {
            return res
                .status(404)
                .json({ message: `cannot find any product with ID ${id}` });
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE
app.delete("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res
                .status(404)
                .json({ message: `cannot find any product with ID ${id}` });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// mongoose.set('strictQuery', false)

mongoose
    .connect(
        "mongodb+srv://admin:admin@meursaultapi.k5lmlvv.mongodb.net/Node-API"
    )
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(3000, () => {
            console.log("Node API app is running on port 3000");
        });
    })
    .catch((error) => {
        console.log(error);
    });
