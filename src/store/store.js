import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";

import protectedReducer from "./protectedSlice";



const store= configureStore({
    
    reducer:{
        
        userinformation:userReducer,
        protected:protectedReducer
    },
})


export default store;
