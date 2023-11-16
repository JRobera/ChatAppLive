import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  error: null,
  chats: null,
};
export const fetchChats = createAsyncThunk(
  "chats/fetchChats",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/chats/${id}`);
      return res.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchChats.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.chats = action.payload;
    });
    builder.addCase(fetchChats.rejected, (state, action) => {
      state.status = "filed";
      state.error = action.error.message;
    });
  },
});

export const selectAllChats = (state) => state.chats.chats;
export const getChatStatus = (state) => state.chats.status;
export const getChatError = (state) => state.chats.error;

export default chatsSlice.reducer;