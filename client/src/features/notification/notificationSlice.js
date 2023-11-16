import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  error: null,
  notification: [],
};

export const fetchNotification = createAsyncThunk(
  "notification/fetchNotification",
  async (data) => {
    const res = await axios.get(
      `http://localhost:4000/api/get/notification/${data}`
    );

    return res.data;
  }
);

export const addNotification = createAsyncThunk(
  "notification/addNotification",
  async (data) => {
    const res = await axios.post(
      "http://localhost:4000/api/add/notification",
      data
    );
    return res.data;
  }
);

export const markAsReadenAsync = createAsyncThunk(
  "notification/markAsReadenAsync",
  async (data) => {
    const res = await axios.put(
      "http://localhost:4000/api/mark-as-readen",
      data
    );
    return res.data;
  }
);
export const deleteNotificationAsync = createAsyncThunk(
  "notification/deleteNotificationAsync",
  async (data) => {
    const res = await axios.put(
      "http://localhost:4000/api/delete/notification",
      data
    );
    return res.data;
  }
);

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNewNotification: (state, action) => {
      state.notification.notifications.push({
        ...action.payload,
        markasReaden: false,
      });
    },
    markAsReaden: (state, action) => {
      state.notification.notifications =
        state.notification.notifications.filter((notif) => {
          if (notif?._id === action.payload) {
            notif.markasReaden = true;
            return notif;
          }
          return notif;
        });
    },
    deleteNotification: (state, action) => {
      state.notification.notifications =
        state.notification.notifications.filter(
          (notif) => notif?._id !== action.payload
        );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotification.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchNotification.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.notification = action.payload;
    });
    builder.addCase(fetchNotification.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const selectAllNotifications = (state) =>
  state.notification.notification.notifications;

export const { addNewNotification, markAsReaden, deleteNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
