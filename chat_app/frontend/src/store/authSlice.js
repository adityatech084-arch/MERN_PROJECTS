import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";
import { connectSocket, disconnectSocket } from "../lib/socket";
import {toast} from 'react-toastify'

export const getUser = createAsyncThunk("user/me",async(_,thunkApi)=>{
    try {
        const res = await axiosInstance.get("/user/me")
        console.log(res.data);
        connectSocket(res.data.user._id);
        return res.data.user;
    } catch (error) {
        console.log("error",error);
        return thunkApi.rejectWithValue(
            error.response?.data || "Failed to fetch user"
        );
    }
})


export const signup = createAsyncThunk('user/sign-up',async(data,thunkApi)=>{
    try {
        const res = await axiosInstance.post("/user/sign-up",data)
        connectSocket(res.data._id);
        toast.success("accounte created sucesufully");
        return res.data;
    } catch (error) {
        console.log("error",error);
        return thunkApi.rejectWithValue(
            error.response?.data || "Failed to fetch user"
        );
    }

})

export const logout = createAsyncThunk("user/sign-out",async(_,thunkApi)=>{
    try {
        await axiosInstance.get("/user/sign-out");
        disconnectSocket();
        return null;
    } catch (error) {
      toast.error(error.response.data.message);
       return thunkApi.rejectWithValue(
        error.response.data.message
       );
}
})

export const login = createAsyncThunk("user/sign-in",async(data,thunkApi)=>{
    try {
     const res=   await axiosInstance.post("/user/sign-in",data);
        connectSocket(res.data._id)
        toast.success("Logged in sucesufully");
        return res.data
    } catch (error) {
      toast.error(error.response.data.message);
       return thunkApi.rejectWithValue(
        error.response.data.message
       );
}
})

export const updateProfile = createAsyncThunk("user/update-profile",async(data,thunkApi)=>{
    try {
        const res = await axiosInstance.put('/user/update-profile',data);
        toast.success("Profile update succesfully");
        return res.data;
    } catch (error) {
        toast.error(error.responce.data.message)
        return thunkApi.rejectWithValue(error.responce.data.message);
    }
})
const initialState = {
    authUser:null,
    isSingingIn:false,
    isLoggingIn:false,
    isupdatingProfile:false,
    isCheckingAuth:true,
    onlineusers : [],
}
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setOnlineUsers(state,action){
               state.onlineusers = action.payload.map(u => 
      typeof u === "object" ? u._id : u
    );
        },
    },
    extraReducers:(builder) =>{
        builder.addCase(getUser.fulfilled,(state,action)=>{
            state.authUser = action.payload;
            state.isCheckingAuth = false;
        })
        .addCase(getUser.rejected,(state,action)=>{
            state.authUser = null;
            state.isCheckingAuth = false;
        }).addCase(logout.fulfilled,(state)=>{
             state.authUser = null;
    //   state.isCheckingAuth = false;
        }).addCase(logout.rejected,(state)=>{
            state.authUser=state.authUser
        }).addCase(login.pending,(state)=>{
            state.isLoggingIn = true;
        }).addCase(login.fulfilled ,(state,action)=>{
            state.authUser = action.payload;
            state.isLoggingIn=false;
        }).addCase(login.rejected,(state)=>{
            state.isLoggingIn=false;
        }).addCase(signup.pending,(state)=>{
            state.isSingingIn = true;
        }).addCase(signup.fulfilled,(state,action)=>{
               state.authUser = action.payload;
               state.isSingingIn = false;
        }).addCase(signup.rejected,(state)=>{
            state.isSingingIn = false;            
        }).addCase(updateProfile.pending,(state)=>{
            state.isupdatingProfile = true;
        }).addCase(updateProfile.fulfilled,(state,action)=>{
            state.authUser =  action.payload;
            state.isupdatingProfile = false;
        }).addCase(updateProfile.rejected,(state)=>{
            state.isupdatingProfile = false;
        })
    }

})


export const {setOnlineUsers} = authSlice.actions;
export default authSlice.reducer;
