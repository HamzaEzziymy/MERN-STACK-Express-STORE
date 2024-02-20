// importation mongoose modulle
const mongoose = require("mongoose");

// Schema
const ProductsSchema = new mongoose.Schema({
    inventory:Number
})

// modul users
const ProductsModule = mongoose.model("products", ProductsSchema)

// exportation modull users
module.exports = ProductsModule;