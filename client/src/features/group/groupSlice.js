import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  error: null,
  group: null,
};
export const fetchGroup = createAsyncThunk(
  "group/fetchGroup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios("http://localhost:4000/api/get-groups");
      return res.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const groupSlice = createSlice({
  name: "group",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchGroup.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(fetchGroup.fulfilled, (state, action) => {
        state.status = "suceeded";
        state.group = action.payload;
        // console.log(action.payload);
      });
    builder.addCase(fetchGroup.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const selectAllGroup = (state) => state.group.group;

export default groupSlice.reducer;
