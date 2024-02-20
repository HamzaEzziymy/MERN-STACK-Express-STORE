// importation mongoose modulle
const mongoose = require("mongoose");

// Schema
const UsersSchema = new mongoose.Schema({
    name: String,
    photo: String,
    login: String,
    password: String,
    sex: String,
    age: Number
})

// modul users
const UsersModule = mongoose.model("users", UsersSchema)

// exportation modull users
module.exports = UsersModule;