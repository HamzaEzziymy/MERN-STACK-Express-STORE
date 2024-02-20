// importation mongoose modulle
const mongoose = require("mongoose");

// Schema
const AdminSchema = new mongoose.Schema()

// modul admin
const AdminModule = mongoose.model("admin", AdminSchema)

// exportation modull admin
module.exports = AdminModule;