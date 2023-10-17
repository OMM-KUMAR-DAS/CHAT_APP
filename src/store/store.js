import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";



const store= configureStore({
    
    reducer:{
        
        userinformation:userReducer,
        
    },
})


export default store;
