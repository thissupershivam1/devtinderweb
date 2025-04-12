import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: null, // store a single user object
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = action.payload; // ✅ use the full payload as the user object
    },
    removeUser: (state) => {
      state.users = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
