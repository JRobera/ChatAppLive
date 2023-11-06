import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import chatsReducer from "../features/chats/chatsSlice";
import groupReducer from "../features/group/groupSlice";
import messageReducer from "../features/messages/messageSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    chats: chatsReducer,
    group: groupReducer,
    messages: messageReducer,
  },
});
