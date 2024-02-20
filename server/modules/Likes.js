// importation mongoose modulle
const mongoose = require("mongoose");

// Schema
const LikesSchema = new mongoose.Schema({
    userID:String,
    pID:String,
    name:String,
    price:Number,
    shipping:Number,
    inventory:Number,
    img:String,
    description:String
})

// modul users
const LikesModule = mongoose.model("likes", LikesSchema)

// exportation modull users
module.exports = LikesModule;