import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  error: null,
  messages: [],
};

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (data) => {
    const query = new URLSearchParams(data).toString();
    const res = await axios.get(`http://localhost:4000/api/messages?${query}`);
    return res.data;
  }
);

export const postMessage = createAsyncThunk(
  "message/postMessage",
  async (data) => {
    const res = await axios.post("http://localhost:4000/api/add/message", data);
    return res.data;
  }
);

export const deleteMessageAsync = createAsyncThunk(
  "messages/deleteMessage",
  async (data) => {
    const res = await axios.put(
      "http://localhost:4000/api/delete/message",
      data
    );
    return res.data;
  }
);

export const fetchGroupChat = createAsyncThunk(
  "groupchat/fetchGroupChat",
  async (data) => {
    const query = new URLSearchParams(data).toString();
    const res = await axios(
      `http://localhost:4000/api/get-group/chat?${query}`
    );
    return res.data;
  }
);

export const postGroupMessage = createAsyncThunk(
  "groupmessage/postGroupMessage",
  async (data) => {
    const res = await axios.post(
      "http://localhost:4000/api/add-group/message",
      data
    );
    return res.data;
  }
);

export const deleteGroupMessageAsync = createAsyncThunk(
  "messages/deleteMessage",
  async (data) => {
    const res = await axios.put(
      "http://localhost:4000/api/delete/group/message",
      data
    );
    return res.data;
  }
);

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addNewMessage: (state, action) => {
      console.log(action.payload);
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
      state.error = action.error.message;
    });
    // post new massage to db
    builder.addCase(postMessage.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(postMessage.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.messages.chats = state.messages.chats?.map((chat, idx) => ({
        ...chat,
        _id: action.payload[idx]?._id,
      }));
    });
    builder.addCase(postMessage.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
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
      state.error = action.error.message;
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
      state.error = action.error.message;
    });
    // post new group massage to db
    builder.addCase(postGroupMessage.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(postGroupMessage.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.messages = action.payload;
      console.log(action.payload);
    });
    builder.addCase(postGroupMessage.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { addNewMessage, deleteMessage, restMessage } =
  messagesSlice.actions;

export default messagesSlice.reducer;
