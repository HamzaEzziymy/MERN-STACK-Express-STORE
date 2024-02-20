// importation mongoose modulle
const mongoose = require("mongoose");

// Schema
const ConversationsSchema = new mongoose.Schema({
    conversation:Array,
    msg:String,
    time:String,
    to:String,
    from:String
})

// modul users
const ConversationsModule = mongoose.model("conversations", ConversationsSchema)

// exportation modull users
module.exports = ConversationsModule;