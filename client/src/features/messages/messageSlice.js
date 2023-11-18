import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../axios";

const initialState = {
  status: "idle",
  error: null,
  messages: [],
};

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (data, { rejectWithValue }) => {
    const query = new URLSearchParams(data).toString();
    try {
      const res = await api.get(`/api/messages?${query}`);
      return res.data.data;
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle specific error response from the server
        return rejectWithValue(error.response.data);
      } else {
        // Handle generic or network error
        throw error;
      }
    }
  }
);

export const postMessage = createAsyncThunk(
  "message/postMessage",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/add/message", data);
      return res.data.data;
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle specific error response from the server
        return rejectWithValue(error.response.data);
      } else {
        // Handle generic or network error
        throw error;
      }
    }
  }
);

export const deleteMessageAsync = createAsyncThunk(
  "messages/deleteMessage",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put("/api/delete/message", data);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle specific error response from the server
        return rejectWithValue(error.response.data);
      } else {
        // Handle generic or network error
        throw error;
      }
    }
  }
);

export const fetchGroupChat = createAsyncThunk(
  "groupchat/fetchGroupChat",
  async (data, { rejectWithValue }) => {
    const query = new URLSearchParams(data).toString();
    try {
      const res = await api(`/api/get-group/chat?${query}`);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle specific error response from the server
        return rejectWithValue(error.response.data);
      } else {
        // Handle generic or network error
        throw error;
      }
    }
  }
);

export const postGroupMessage = createAsyncThunk(
  "groupmessage/postGroupMessage",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/add-group/message", data);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle specific error response from the server
        return rejectWithValue(error.response.data);
      } else {
        // Handle generic or network error
        throw error;
      }
    }
  }
);

export const deleteGroupMessageAsync = createAsyncThunk(
  "messages/deleteMessage",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put("/api/delete/group/message", data);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle specific error response from the server
        return rejectWithValue(error.response.data);
      } else {
        // Handle generic or network error
        throw error;
      }
    }
  }
);

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addNewMessage: (state, action) => {
      // console.log(action.payload);
      state.messages?.chats?.push(action.payload);
    },
    deleteMessage: (state, action) => {
      state.messages.chats = state.messages.chats.filter(
        (message) => message._id !== action.payload
      );
    },
    restMessage: (state, action) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    // fetch massages from db
    builder.addCase(fetchMessages.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.messages = action.payload;
    });
    builder.addCase(fetchMessages.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    });
    // post new massage to db
    builder.addCase(postMessage.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(postMessage.fulfilled, (state, action) => {
      state.status = "succeeded";
      console.log(state.payload);
      state.messages.chats = state.messages.chats?.map((chat, idx) => ({
        ...chat,
        _id: action.payload[idx]?._id,
      }));
    });
    builder.addCase(postMessage.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    });

    //delete chat
    builder.addCase(deleteMessageAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteMessageAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(deleteMessageAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    });

    // fetch group chat
    builder.addCase(fetchGroupChat.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(fetchGroupChat.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
        // console.log(action.payload.chats);
      });
    builder.addCase(fetchGroupChat.rejected, (state, action) => {
      state.error = action.payload.error;
    });
    // post new group massage to db
    builder.addCase(postGroupMessage.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(postGroupMessage.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.messages = action.payload;
      // console.log(action.payload);
    });
    builder.addCase(postGroupMessage.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    });
  },
});

export const { addNewMessage, deleteMessage, restMessage } =
  messagesSlice.actions;

export default messagesSlice.reducer;
