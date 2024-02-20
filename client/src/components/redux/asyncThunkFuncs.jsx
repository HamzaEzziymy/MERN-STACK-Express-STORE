import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// admin id
// const id = "65b2d645a6b6e577e7faffc2"
// localStorage.current_user_login = "65b2d645a6b6e577e7faffc2";

// ahmadi id 
// const id = "65b161ebab2e7f6e92c595dc"
// localStorage.current_user_login = "65b161ebab2e7f6e92c595dc";

// ezziymy id
// const id = "65b1632bab2e7f6e92c595dd"
// localStorage.current_user_login = "65b1632bab2e7f6e92c595dd";


// localStorage.current_user_login = "";

const id = localStorage.current_user_login;

// const api = "http://192.168.137.1:8080";
const api = "http://localhost:8080";

// -------------------get Products-----------------------------
export const getProducts = createAsyncThunk("xpress/getProducts", async()=>{
    return await axios.get(`${api}/products`)
    .then(res=>res.data)
    .catch(error => console.log(error))
})

export const extraProducts = (builder) => {
        builder.addCase(getProducts.pending,(state)=>{
        state.loading_products = true;
    }).addCase(getProducts.fulfilled, (state, action)=>{
        state.loading_products = false;
        state.products = action.payload;
    }).addCase(getProducts.rejected, (state)=>{
        state.loading_products = false;
    })
}
// -------------------get admin-----------------------------
export const getAdmin = createAsyncThunk("xpress/getAdmin", async()=>{
    return await axios.get(`${api}/admin`, { params: { _id: id } })
    .then(res=>res.data)
    .catch(error => console.log(error))
})

export const extraAdmin = (builder) => {
    builder.addCase(getAdmin.pending,(state)=>{
        state.loading_admin = true;
    }).addCase(getAdmin.fulfilled, (state, action)=>{
        state.loading_admin = false;
        state.admin = action.payload;

    }).addCase(getAdmin.rejected, (state)=>{
        state.loading_admin = false;
    })
}
// -------------------get users-----------------------------
export const getUser = createAsyncThunk("xpress/getUser", async()=>{
    return await axios.get(`${api}/users`, { params: { _id: id } })
    .then(res => res.data)
    .catch(error => console.log(error))
})

export const extraUser = (builder) => {
    builder.addCase(getUser.pending,(state)=>{
        state.loading_user = true;
    }).addCase(getUser.fulfilled, (state, action)=>{
        state.loading_user = false;
        state.user = action.payload;

    }).addCase(getUser.rejected, (state)=>{
        state.loading_user = false;
    })
}

// -------------------get Orders-----------------------------
export const getOrders = createAsyncThunk("xpress/getOrders", async()=>{
    return await axios.get(`${api}/orders`, { params: { _id: id } })
    .then(res=>res.data)
    .catch(error => console.log(error));
})

export const extraOrders = (builder) => {
    builder.addCase(getOrders.pending,(state)=>{
        state.loading_orders = true;
    }).addCase(getOrders.fulfilled, (state, action)=>{
        state.loading_orders = false;
        state.orders = action.payload;

    }).addCase(getOrders.rejected, (state)=>{
        state.loading_orders = false;
    })
}

// -------------------get Likes-----------------------------
export const getLikes = createAsyncThunk("xpress/getLikes", async()=>{
    return await axios.get(`${api}/likes`, { params: { _id: id } })
    .then(res=>res.data)
    .catch(error => console.log(error));
})

export const extraLikes = (builder) => {
    builder.addCase(getLikes.pending,(state)=>{
        state.loading_likes = true;
    }).addCase(getLikes.fulfilled, (state, action)=>{
        state.loading_likes = false;
        state.likes = action.payload;

    }).addCase(getLikes.rejected, (state)=>{
        state.loading_likes = false;
    })
}

// -------------------get conversations-----------------------------
export const getConversations = createAsyncThunk("xpress/getConversations", async()=>{
    return await axios.get(`${api}/conversations`, { params: { _id: id } })
    .then(res => res.data)
    .catch(error => console.log(error));
})

export const extraConversations = (builder) => {
    builder.addCase(getConversations.pending,(state)=>{
        state.loading_conversations = true;
    }).addCase(getConversations.fulfilled, (state, action)=>{
        state.loading_conversations = false;
        state.conversations = action.payload;

    }).addCase(getConversations.rejected, (state)=>{
        state.loading_conversations = false;
    })
}