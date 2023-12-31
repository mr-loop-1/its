import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload.user;
      state.userToken = action.payload.token;
    },
    fillUser: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUser, fillUser } = authSlice.actions;

export default authSlice.reducer;
