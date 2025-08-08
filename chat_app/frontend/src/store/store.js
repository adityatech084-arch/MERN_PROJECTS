import {configureStore} from '@reduxjs/toolkit'
import authReducer from "../store/authSlice.js"
import ChatReducer from '../store/chatSlice.js'

const store = configureStore({
    reducer:{
        auth:authReducer,
        chat:ChatReducer
    }
});


export default store;