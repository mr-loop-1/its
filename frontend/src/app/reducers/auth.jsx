import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from '../actions/auth';

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
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
