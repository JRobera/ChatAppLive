import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios.js";

const initialState = {
  status: "idle",
  error: null,
  message: "",
  group: [],
};

export const createGroup = createAsyncThunk(
  "group/createGroup",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const res = await api.post("/api/create-group", data);
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

export const updateGroupProfile = createAsyncThunk(
  "group/updateGroupProfile",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put("/api/update-group/profile", data);
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

export const addMemberToGroup = createAsyncThunk(
  "group/addMemberToGroup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put("/api/add-group/member", data);
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
export const removeMemberFromGroup = createAsyncThunk(
  "group/removeMemberFromGroup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put("/api/delete-group/member", data);
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

export const fetchGroup = createAsyncThunk(
  "group/fetchGroup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api(`/api/get-groups/${data}`);
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

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroupStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGroup.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(fetchGroup.fulfilled, (state, action) => {
        state.status = "suceeded";
        state.group = action.payload.data;
        // console.log(action.payload);
      });
    builder.addCase(fetchGroup.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    });
    // create group
    builder.addCase(createGroup.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createGroup.fulfilled, (state, action) => {
      state.status = "suceeded";
      state.group.push(action.payload.data);
      state.message = action.payload.message;
    });
    builder.addCase(createGroup.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    });
    // update profile
    builder.addCase(updateGroupProfile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateGroupProfile.fulfilled, (state, action) => {
      state.status = "suceeded";
      // console.log(action.payload.data);
      state.group?.filter((group) => {
        if (group?._id === action.payload.data._id) {
          return (group = action.payload.data);
        }
        return group;
      });
      state.message = action.payload.message;
    });
    builder.addCase(updateGroupProfile.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    });
    // add member
    builder.addCase(addMemberToGroup.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addMemberToGroup.fulfilled, (state, action) => {
      state.status = "suceeded";
      // state.group.push(action.payload.data);
      state.message = action.payload.message;
    });
    builder.addCase(addMemberToGroup.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    });
    // remove member
    builder.addCase(removeMemberFromGroup.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(removeMemberFromGroup.fulfilled, (state, action) => {
      state.status = "suceeded";
      // state.group.push(action.payload.data);
      state.message = action.payload.message;
    });
    builder.addCase(removeMemberFromGroup.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    });
  },
});

export const selectAllGroup = (state) => state.group.group;
export const getGroupStatus = (state) => state.group.status;
export const getGroupError = (state) => state.group.error;
export const getGroupMessage = (state) => state.group.message;

export const { setGroupStatus } = groupSlice.actions;

export default groupSlice.reducer;
