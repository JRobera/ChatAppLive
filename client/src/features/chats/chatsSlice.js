import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios";

const initialState = {
  status: "idle",
  error: null,
  chats: [],
};
export const fetchChats = createAsyncThunk(
  "chats/fetchChats",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/chats/${id}`);
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
