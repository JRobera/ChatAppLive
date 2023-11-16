import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  error: null,
  group: null,
};

export const createGroup = createAsyncThunk(
  "group/createGroup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/create-group",
        data
      );
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateGroupProfile = createAsyncThunk(
  "group/updateGroupProfile",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        "http://localhost:4000/api/update-group/profile",
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addMemberToGroup = createAsyncThunk(
  "group/addMemberToGroup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        "http://localhost:4000/api/add-group/member",
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const removeMemberFromGroup = createAsyncThunk(
  "group/removeMemberFromGroup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        "http://localhost:4000/api/delete-group/member",
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchGroup = createAsyncThunk(
  "group/fetchGroup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios(`http://localhost:4000/api/get-groups/${data}`);
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
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(createGroup.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createGroup.fulfilled, (state, action) => {
      state.status = "suceeded";
      state.group.push(action.payload.data);
    });
    builder.addCase(createGroup.rejected, (state, action) => {
      state.status = "failed";
      state.group = action.error.message;
    });
    builder.addCase(updateGroupProfile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateGroupProfile.fulfilled, (state, action) => {
      state.status = "suceeded";
      state.group?.filter((group) => {
        if (group._id === action.payload._id) {
          console.log(action.payload);
          return (group = action.payload);
        }
        return group;
      });
    });
  },
});

export const selectAllGroup = (state) => state.group.group;
export const getGroupStatus = (state) => state.group.status;
export const groupError = (state) => state.group.error;

export default groupSlice.reducer;
