import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../axios";

const initialState = {
  user:
    (Cookies.get("user") !== undefined && JSON.parse(Cookies.get("user"))) ||
    null,
  status: "idle",
  message: "",
  error: null,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/signup", data);
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

export const updateUserName = createAsyncThunk(
  "userName/updateUserName",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put("/api/update/user-name", data);
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
export const changeUserPassword = createAsyncThunk(
  "changePassword/changeUserPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put("/api/change/user-password", data);
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

export const changeUserProfile = createAsyncThunk(
  "user/changeUserProfile",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put("/api/change/user-profile", data);
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

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/signin", data);
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      Cookies.set("user", JSON.stringify(action.payload.data));
      state.user = action.payload.data;
      state.message = action.payload.message;
      // console.log(action.payload);
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
      // console.log(action);
    });
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      Cookies.set("user", JSON.stringify(action.payload.data));
      state.user = action.payload.data;
      state.message = action.payload.message;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    });
    // Update User name
    builder.addCase(updateUserName.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateUserName.fulfilled, (state, action) => {
      state.status = "succeeded";
      Cookies.set("user", JSON.stringify(action.payload.data));
      state.user = action.payload.data;
      state.message = action.payload.message;
    });
    builder.addCase(updateUserName.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    });
    // Change Password
    builder.addCase(changeUserPassword.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(changeUserPassword.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.message = action.payload.message;
      // console.log(action.payload);
    });
    builder.addCase(changeUserPassword.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    });
    // Change Profile
    builder.addCase(changeUserProfile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(changeUserProfile.fulfilled, (state, action) => {
      state.status = "succeeded";
      Cookies.set("user", JSON.stringify(action.payload.data));
      state.user = action.payload.data;
      state.message = action.payload.message;
    });
    builder.addCase(changeUserProfile.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    });
  },
});

export const selectUser = (state) => state.user.user;

export const getUserStatus = (state) => state.user.status;

export const getUserMessage = (state) => state.user.message;

export const getUserError = (state) => state.user.error;

export const { setUserStatus } = userSlice.actions;

export default userSlice.reducer;
