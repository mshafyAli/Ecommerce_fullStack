import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user.js";
import { sellerReducer } from "./reducers/seller.js";
import { productReducer } from "./reducers/product.js";


const store = configureStore({
    reducer: {
        user:userReducer,
        seller:sellerReducer,
        products:productReducer,
    },
});

export default store;