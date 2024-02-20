// importation express modull
const express = require("express");

// port
const port = 8080;

// adminID
const adminID = "65b2d645a6b6e577e7faffc2"

// importation mongoose module
const mongoose = require("mongoose");



// importation ProductsModule from Products.js
const ProductsModule = require("./modules/Products");
// importation UsersModule from Users.js
const UsersModule = require("./modules/Users");
// importation OrdersModule from Orders.js
const OrdersModule = require("./modules/Orders");
// importation LikesModule from Likes.js
const LikesModule = require("./modules/Likes")
// importation LikesModule from Likes.js
const ConversationsModule = require("./modules/Conversations")
// importation LikesModule from Likes.js
const AdminModule = require("./modules/Admin");



// importation cors
const cors = require("cors");

// app express
const app = express();

// use express.js
app.use(express.json())

// use cros
app.use(cors());

//connet white mongoose 
mongoose.connect("mongodb://127.0.0.1:27017/xprees")


// ----------------------------------------------------get data-------------------
// get products from mongodb
app.get("/products", async (req, res)=>{
    try {
        const products = await ProductsModule.find();
        res.json(products)
    } catch (error) {
        res.json([])
    }
})

// get admin from mongodb
app.get("/admin", async (req, res)=>{
    const id = req.query._id;
    if(id === adminID){
        const admin = await AdminModule.find({_id:id});
        res.json(admin)
    }else{
        res.json(null)
    }
})

// get users from mongodb
app.get("/users", async (req, res)=>{
    const id = req.query._id;
    try {
        if(id === adminID){
            const user = await UsersModule.find();
            res.json(user)
        }else{
            const user = await UsersModule.find({_id:id});
            res.json(user)
        }
    } catch (error) {
        res.json(null)
    }
})

// get orders from mongodb
app.get("/orders", async (req, res)=>{
    const id = req.query._id;
    try {
        if(id === adminID){
            const orders = await OrdersModule.find();
            res.json(orders)
        }else{
            const orders = await OrdersModule.find({"userID":id});
            res.json(orders)
        }
    } catch (error) {
        res.json([])
    }
})

// get orders from mongodb
app.get("/likes", async (req, res)=>{
    const id = req.query._id;
    try {
        if(id === adminID){
            const likes = await LikesModule.find();
            res.json(likes)
        }else{
            const likes = await LikesModule.find({"userID":id});
            res.json(likes)
        }
    } catch (error) {
        res.json([])
    }
})

// get conversations from mongodb
app.get("/conversations", async (req, res)=>{
    const id = req.query._id;
    try {
        if(id === adminID){
            const conversations = await ConversationsModule.find();
            res.json(conversations)
        }else{
            const conversations = await ConversationsModule.find({_id:id});
            res.json(conversations)
        }
    } catch (error) {
        res.json([])
    }
})

// post signUp on mongodb
app.post("/signup", async (req, res)=>{
    const {login, password} = req.body;
    const result = await UsersModule.find({login})
    if(result.length>0){
        res.json("this login already used!")
    }else{
        const newUser = new UsersModule({
            name: login,
            photo: "https://www.omgtb.com/wp-content/uploads/2021/04/620_NC4xNjE-1-scaled.jpg",
            login: login,
            password: password,
            sex: null,
            age: null
        })
        await newUser.save();

        // ---newconversation
        const newConver = new ConversationsModule({
            _id:newUser._id,
            conversation:[]
        })
        newConver.save();

        res.json("login")
    }
})


// post login on mongodb
app.post("/login", async (req, res)=>{
    const {login, password} = req.body;
    const result = await UsersModule.find({login, password})
    if(result.length>0){
        res.json(result)
    }else{
        const result = await AdminModule.find({login, password})
        if(result.length>0){
            res.json(result)
        }else{
            res.json("Login or Password incorect!")
        }
    }
})


// edit profile
app.put("/editProfile", async (req, res)=>{
    const info = req.body;
    const result = await UsersModule.updateOne({_id:info.id}, {$set: {name:info.name, age:info.age, sex:info.sex, photo:info.photoUrl}})
    res.json(result)
})


// sending the message
app.put("/sendMessage", async (req, res)=>{
    const conversation = req.body;

    if(conversation.to === "admin"){
        const sendMessage = await ConversationsModule.updateOne(
            {_id:conversation._id},
            {
                $push: {
                    conversation:{
                        to: "admin",
                        msg: conversation.msg,
                        time: conversation.time
                    }
                  }
            }
        )
        res.json(sendMessage)
    }else{
        const sendMessage = await ConversationsModule.updateOne(
            {_id:conversation._id},
            {
                $push: {
                    conversation:{
                        from: "admin",
                        msg: conversation.msg,
                        time: conversation.time
                    }
                }
            }
        )
        res.json(sendMessage)
    }
})

// like products
app.post("/addToLikes", async (req, res)=>{
    const info = req.body;

    if(info.id !== adminID){
            const isLike = await LikesModule.find({userID:info.id, pID:info.product._id})
        if(isLike.length > 0){
            const unlike = await LikesModule.deleteOne({userID:info.id, pID:info.product._id})
            res.json(unlike)
        }else{
            const likeIt = new LikesModule({
                userID:info.id,
                pID:info.product._id,
                name:info.product.name,
                price:info.product.price,
                shipping:info.product.shipping,
                inventory:info.product.inventory,
                img:info.product.imgs[0],
                description:info.product.description,
            })
            await likeIt.save();
            res.json(likeIt)
        }
    }
})



// like products
app.post("/addToOrders", async (req, res)=>{
    const info = req.body;

    if(info.id !== adminID){
            const inOrders = await OrdersModule.find({userID:info.id, pID:info.product._id})
        if(inOrders.length > 0){
            const incOrder = await OrdersModule.updateOne({userID:info.id, pID:info.product._id}, {$inc:{qnt:1}})
            await ProductsModule.updateOne({_id:info.product._id}, {$inc:{inventory:-1}})
            res.json(incOrder)
        }else{
            const addOrder = new OrdersModule({
                userID:info.id,
                pID:info.product._id,
                name:info.product.name,
                price:info.product.price,
                shipping:info.product.shipping,
                qnt:1,
                img:info.product.imgs[0],
                description:info.product.description,
            })
            await addOrder.save();
            await ProductsModule.updateOne({_id:info.product._id}, {$inc:{inventory:-1}})
            res.json(addOrder)
        }
    }
})












// listening in port 8080
app.listen(port, () => {
    console.log(`listen on port ${port}...`)
})