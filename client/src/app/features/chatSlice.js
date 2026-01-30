import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";

/* =======================
   THUNKS
======================= */

// Mark chat as read (DB)
export const markChatAsReadDb = createAsyncThunk(
  "chat/markChatAsReadDb",
  async (chatUserId, { rejectWithValue }) => {
    try {
      await axiosInstance.put(`/message/mark-read/${chatUserId}`);
      return chatUserId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch chats
export const fetchChats = createAsyncThunk(
  "chat/fetchChats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/message/previous-chats");
      return res.data.chats;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch messages
export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      return { userId, messages: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Send message
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ receiverId, text, media }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("receiverId", receiverId);
      formData.append("text", text || "");
      media?.forEach((file) => formData.append("media", file));

      const res = await axiosInstance.post(
        "/message/send-message",
        formData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Search users
export const searchUsers = createAsyncThunk(
  "chat/searchUsers",
  async (username, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/auth/user/search?username=${username}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* =======================
   SLICE
======================= */

const initialState = {
  chats: [],
  selectedUser: null,
  messages: [],
  searchResults: [],
  loadingSearch: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    /* ---------- REALTIME MESSAGE ---------- */
    addMessageInfo: (state, action) => {
      const { message, selectedUserId } = action.payload;
      const chatUserId = message.sender;
      const isActiveChat = selectedUserId === chatUserId;

      const index = state.chats.findIndex(
        (c) => (c.user?._id || c.user) === chatUserId
      );

      if (index !== -1) {
        const chat = state.chats[index];
        chat.lastMessage = message.text || "Media";

        if (!isActiveChat) {
          chat.unreadCount = (chat.unreadCount || 0) + 1;
        }

        state.chats.splice(index, 1);
        state.chats.unshift(chat);
      } else {
        state.chats.unshift({
          user: { _id: chatUserId, fullName: message.senderName || "Unknown" },
          lastMessage: message.text || "Media",
          lastMessageAt: message.createdAt || new Date(),
          unreadCount: isActiveChat ? 0 : 1,
        });
      }

      if (isActiveChat) state.messages.push(message);
    },

    /* ---------- LOCAL UI HELPERS ---------- */
    addMessage: (state, action) => {
      const msg = action.payload;
      if (!state.messages.find((m) => m._id === msg._id)) {
        state.messages.push(msg);
      }
    },

    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },

    resetUnreadCountLocal: (state, action) => {
      const chat = state.chats.find(
        (c) => c.user?._id === action.payload
      );
      if (chat) chat.unreadCount = 0;
    },

    incrementUnread: (state, action) => {
      const chat = state.chats.find(
        (c) => (c.user?._id || c.user) === action.payload
      );
      if (chat) chat.unreadCount = (chat.unreadCount || 0) + 1;
    },

    resetSearchResults: (state) => {
      state.searchResults = [];
    },

    setChat: (state, action) => {
      const chat = action.payload;
      const exists = state.chats.find(
        (c) => c.user?._id === chat.user?._id
      );

      if (!exists) state.chats.unshift(chat);
      state.selectedUser = chat.user;
    },
  },

  extraReducers: (builder) => {
    builder
      /* ---- FETCH CHATS ---- */
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.chats = action.payload;
      })

      /* ---- FETCH MESSAGES ---- */
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload.messages;
      })

      /* ---- SEND MESSAGE ---- */
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload.data);
      })

      /* ---- MARK READ ---- */
      .addCase(markChatAsReadDb.fulfilled, (state, action) => {
        const chat = state.chats.find(
          (c) => (c.user?._id || c.user) === action.payload
        );
        if (chat) chat.unreadCount = 0;
      })

      /* ---- SEARCH ---- */
      .addCase(searchUsers.pending, (state) => {
        state.loadingSearch = true;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.loadingSearch = false;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.loadingSearch = false;
      });
  },
});

export const {
  addMessage,
  addMessageInfo,
  setSelectedUser,
  resetUnreadCountLocal,
  incrementUnread,
  resetSearchResults,
  setChat,
} = chatSlice.actions;

export default chatSlice.reducer;
