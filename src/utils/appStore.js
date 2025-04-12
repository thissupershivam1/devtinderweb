// store.js or appStore.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // make sure the path is correct

export const appStore = configureStore({
  reducer: {
    user: userReducer, // ✅ This must match the slice name or your chosen key
  },
});
