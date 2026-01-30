import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { connectSocket, disconnectSocket } from "../../socket";
import { fetchChats } from "../chat/chatSlice";
import { getgroups } from "../group/groupSlice";

/* =======================
   CHECK AUTH
======================= */
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.get("/auth/user/me");
      const user = res.data.user;

      connectSocket(user._id);
      dispatch(fetchChats());

      return user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =======================
   SIGNUP
======================= */
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.post(
        "/auth/user/register",
        userData
      );

      const user = res.data.user;

      connectSocket(user._id);
      dispatch(fetchChats());

      return user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =======================
   LOGIN
======================= */
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.post(
        "/auth/user/login",
        userData
      );

      const user = res.data.user;

      connectSocket(user._id);
      dispatch(fetchChats());
      dispatch(getgroups());

      return user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =======================
   LOGOUT
======================= */
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/logout");

      // 🔌 Disconnect socket
      disconnectSocket();

      return res.data; // message only
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =======================
   SLICE
======================= */
const initialState = {
  authUser: null,
  isSigningUp: false,
  isLoginging: false,
  isCheckingAuth: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ---- CHECK AUTH ---- */
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.authUser = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isCheckingAuth = false;
        state.authUser = null;
        state.error = action.payload;
      })

      /* ---- SIGNUP ---- */
      .addCase(signup.pending, (state) => {
        state.isSigningUp = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isSigningUp = false;
        state.authUser = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isSigningUp = false;
        state.error = action.payload;
      })

      /* ---- LOGIN ---- */
      .addCase(login.pending, (state) => {
        state.isLoginging = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoginging = false;
        state.authUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoginging = false;
        state.error = action.payload;
      })

      /* ---- LOGOUT ---- */
      .addCase(logout.fulfilled, (state) => {
        state.authUser = null;
        state.isCheckingAuth = false;
        state.isSigningUp = false;
        state.isLoginging = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
