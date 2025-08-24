import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";
import { connectSocket, disconnectSocket } from "../lib/socket";
import { toast } from "react-toastify";

/**
 * Get current user (restore session after refresh)
 */
export const getUser = createAsyncThunk("user/me", async (_, thunkApi) => {
  try {
    const res = await axiosInstance.get("/user/me", { withCredentials: true });
    connectSocket(res.data.user);
    return res.data.user;
  } catch (error) {
    console.log("error", error);
    return thunkApi.rejectWithValue(
      error.response?.data || "Failed to fetch user"
    );
  }
});

/**
 * Signup
 */
export const signup = createAsyncThunk("user/sign-up", async (data, thunkApi) => {
  try {
    const res = await axiosInstance.post("/user/sign-up", data, { withCredentials: true });
    connectSocket(res.data.user);
    toast.success("Account created successfully");
    return res.data.user;
  } catch (error) {
    console.log("error", error);
    toast.error(error.response?.data?.message || "Signup failed");
    return thunkApi.rejectWithValue(error.response?.data || "Signup failed");
  }
});

/**
 * Login
 */
export const login = createAsyncThunk("user/sign-in", async (data, thunkApi) => {
  try {
    const res = await axiosInstance.post("/user/sign-in", data, { withCredentials: true });
    connectSocket(res.data.user);
    toast.success("Logged in successfully");
    return res.data.user;
  } catch (error) {
    console.log("error", error);
    toast.error(error.response?.data?.message || "Login failed");
    return thunkApi.rejectWithValue(error.response?.data || "Login failed");
  }
});

/**
 * Logout
 */
export const logout = createAsyncThunk("user/sign-out", async (_, thunkApi) => {
  try {
    await axiosInstance.get("/user/sign-out", { withCredentials: true });
    disconnectSocket();
    return null;
  } catch (error) {
    console.log("error", error);
    toast.error(error.response?.data?.message || "Logout failed");
    return thunkApi.rejectWithValue(error.response?.data?.message || "Logout failed");
  }
});

/**
 * Update Profile
 */
export const updateProfile = createAsyncThunk(
  "user/update-profile",
  async (data, thunkApi) => {
    try {
      const res = await axiosInstance.put("/user/update-profile", data, {
        withCredentials: true,
      });
      toast.success("Profile updated successfully");
      return res.data.user;
    } catch (error) {
      console.log("error", error);
      toast.error(error.response?.data?.message || "Update failed");
      return thunkApi.rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

const initialState = {
  authUser: null,
  isSingingIn: false,
  isLoggingIn: false,
  isupdatingProfile: false,
  isCheckingAuth: true,
  onlineusers: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setOnlineUsers(state, action) {
      state.onlineusers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get User
      .addCase(getUser.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isCheckingAuth = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.authUser = null;
        state.isCheckingAuth = false;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isLoggingIn = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggingIn = false;
      })

      // Signup
      .addCase(signup.pending, (state) => {
        state.isSingingIn = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isSingingIn = false;
      })
      .addCase(signup.rejected, (state) => {
        state.isSingingIn = false;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.authUser = null;
      })

      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.isupdatingProfile = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isupdatingProfile = false;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.isupdatingProfile = false;
      });
  },
});

export const { setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;
