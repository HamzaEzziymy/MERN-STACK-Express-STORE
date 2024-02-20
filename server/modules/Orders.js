// importation mongoose modulle
const mongoose = require("mongoose");

// Schema
const OrdersSchema = new mongoose.Schema({
    userID:String,
    pID:String,
    name:String,
    price:Number,
    shipping:Number,
    qnt:Number,
    img:String,
    description:String
})

// modul users
const OrdersModule = mongoose.model("orders", OrdersSchema)

// exportation modull users
module.exports = OrdersModule;