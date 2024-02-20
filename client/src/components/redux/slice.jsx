import { createSlice } from "@reduxjs/toolkit";
import { extraAdmin, extraConversations, extraLikes, extraOrders, extraProducts, extraUser } from "./asyncThunkFuncs";

// const api = "http://192.168.137.1:8080";
// const api = "http://localhost:8080";


export const Slice = createSlice({
    name: "xpress",
    initialState:{
        adminID:"65b2d645a6b6e577e7faffc2",
        products:[],
        admin:[],
        user:[],
        likes:[],
        orders:[],
        conversations:[],
        loading_products:true,
        loading_admin:true,
        loading_user:true,
        loading_orders:true,
        loading_likes:true,
        loading_conversations:true,
        signupResult:"",
    },
    //--------------------------Reducers--------------
    reducers: {
        addToOrders: (state, action) => {
            console.log("ADD TO ORDERS")
        }
        
    },
    //--------------------------Extra Reducers--------------
    extraReducers:(builder)=>{
        // ------------Products--------
        extraProducts(builder)
        // ------------Admin--------
        extraAdmin(builder)
        // ------------Users--------
        extraUser(builder)
        // ------------Orders--------
        extraOrders(builder)
        // ------------Likes--------
        extraLikes(builder)
        // ------------conversations--------
        extraConversations(builder)
    }
})

export const { addToOrders, signUp } = Slice.actions;
export default Slice.reducer;