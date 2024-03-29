import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user.js";
import { sellerReducer } from "./reducers/seller.js";
import { eventReducer } from "./reducers/event.js";
import { productReducer } from "./reducers/product.js";




const store = configureStore({
    reducer: {
        user:userReducer,
        seller:sellerReducer,
        products:productReducer,
        events:eventReducer,
    },
});

export default store;