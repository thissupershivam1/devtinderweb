// store.js or appStore.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; 
import feedReducer from "./feedSlice";
import requestReducer from "./requestSlice";
import connectionReducer from "./connectSlice";

export const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer, 
    requests: requestReducer,
    connections: connectionReducer,
  },
});
