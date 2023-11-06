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
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.chats = action.payload;
    });
  },
});

export const selectAllpost = (state) => state.chats.chats;
export const getChatStatus = (state) => state.status;
export const getChatError = (state) => state.error;

export default chatsSlice.reducer;
