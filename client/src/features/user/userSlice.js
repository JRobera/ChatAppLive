import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  user:
    (Cookies.get("user") !== undefined && JSON.parse(Cookies.get("user"))) ||
    null,
  status: "idle",
  error: null,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:4000/api/signup", data);
      return res.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUserName = createAsyncThunk(
  "userName/updateUserName",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        "http://localhost:4000/api/update/user-name",
        data
      );
      return res.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);
export const changeUserPassword = createAsyncThunk(
  "changePassword/changeUserPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        "http://localhost:4000/api/change/user-password",
        data
      );
      return res.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const changeUserProfile = createAsyncThunk(
  "user/changeUserProfile",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        "http://localhost:4000/api/change/user-profile",
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:4000/api/signin", data);
      return res.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      Cookies.set("user", JSON.stringify(action.payload));
      state.user = action.payload;
      console.log(action.payload);
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      console.log(action);
    });
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      Cookies.set("user", JSON.stringify(action.payload));
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      console.log(action.payload);
    });
    // Update User name
    builder.addCase(updateUserName.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateUserName.fulfilled, (state, action) => {
      state.status = "succeeded";
      Cookies.set("user", JSON.stringify(action.payload));
      state.user = action.payload;
    });
    builder.addCase(updateUserName.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    // Change Password
    builder.addCase(changeUserPassword.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(changeUserPassword.fulfilled, (state, action) => {
      state.status = "succeeded";
      console.log(action.payload);
    });
    builder.addCase(changeUserPassword.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      console.log(action.error.message);
    });
    // Change Profile
    builder.addCase(changeUserProfile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(changeUserProfile.fulfilled, (state, action) => {
      state.status = "succeeded";
      Cookies.set("user", JSON.stringify(action.payload));
      state.user = action.payload;
    });
    builder.addCase(changeUserProfile.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      console.log(action.error.message);
    });
  },
});

export const selectUser = (state) => state.user.user;

export const getUserStatus = (state) => state.user.status;

export const getUserError = (state) => state.user.error;

export const {} = userSlice.actions;

export default userSlice.reducer;
