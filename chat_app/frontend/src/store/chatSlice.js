import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";


// jab bhi ham koi AsyncThunk banata hai to uska liya ham ky create karta hai extraReducers banata hai slice ma
export const getUsers = createAsyncThunk("chat/getUsers",async(_,thunkApi)=>{
    try {
        const res = await axiosInstance.get("/message/users");
    
        return res.data.users;
    } catch (error) {
         toast.error(error.response?.data?.message);
               return thunkApi.rejectWithValue(
                error.response?.data?.message
               );
    }
});

export const getMessages = createAsyncThunk("chat/getMessage",async( userId,thunkApi)=>{
    try {
        const res = await axiosInstance(`/message/${userId}`);
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        return thunkApi.rejectWithValue(error.response.data.message);
    }
});

export const sendMessage = createAsyncThunk("chat/sendMessage",async(messageData,thunkApi)=>{
    try {
        const {chat} = thunkApi.getState();
        const res = await axiosInstance.post(`/message/send/${chat.selectedUser._id}`,
            messageData);
            // console.log(res.data)
        return res.data;
    } catch (error) {
          toast.error(error.response.data.message);
        return thunkApi.rejectWithValue(error.response.data.message);
    }
})


const initialState = {
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessageLoading:false,
}

const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{
        setSelectedUser:(state,action)=>{

            state.selectedUser = action.payload;
        },
        pushNewMessage:(state,action)=>{
            state.messages.push(action.payload);
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getUsers.pending,(state)=>{
            state.isUserLoading = true;
        }).addCase(getUsers.fulfilled,(state,action)=>{

            state.users = action.payload;
            state.isUserLoading = false;
        }).addCase(getUsers.rejected,(state)=>{
            state.isUserLoading = false;
        }).addCase(getMessages.pending,(state)=>{
            state.isMessageLoading = true; 
        }).addCase(getMessages.fulfilled,(state,action)=>{
            state.messages = action.payload.messages;
            state.isMessageLoading = false;
        }).addCase(getMessages.rejected,(state)=>{
            state.isMessageLoading = false;
        }).addCase(sendMessage.fulfilled,(state,action)=>{
            //    console.log(action.payload)
               state.messages.push(action.payload)
        })
    }
})

export const {setSelectedUser,pushNewMessage}=chatSlice.actions;

export default chatSlice.reducer;