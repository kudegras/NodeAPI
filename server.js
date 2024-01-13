require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoute");
const errorMiddleware = require("./middleware/errorMiddleware");
const cors = require("cors");

const app = express();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;
const FRONTEND = process.env.FRONTEND;

var corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
// when false the params used are either string or number only
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
    // throw new Error('fake error');
    res.send("Hello Node API");
});

app.get("/blog", (req, res) => {
    res.send("Hello Blog, My name is Meursault");
});

app.use(errorMiddleware);

// mongoose.set('strictQuery', false)

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Node API app is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
