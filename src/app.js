const express = require("express");
const app = express();
const adminRouter = require("./routes/admin.router");
const authRouter = require("./routes/auth.router");
const productsRouter = require("./routes/products.router");
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/auth" , authRouter);
app.use("/products", productsRouter);
app.get("/", (req, res) => {
    res.status(200).send("Welcome to our API")
})
app.use("*/", (req, res) => {
    res.status(404).json({message: "Route not found"})
});



module.exports = app;