import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from '../actions/auth';

const initialState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log('🚀 ~ file: auth.jsx:25 ~ action:', action);
      state.userInfo = action.payload.user;
      state.userToken = action.payload.token;
    },
  },

  //   extraReducers: (builder) => {
  //     builder.addCase(registerUser.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     });
  //     builder.addCase(registerUser.fulfilled, (state, { payload }) => {
  //       state.loading = false;
  //       state.success = true; // registration successful
  //     });
  //     builder.addCase(registerUser.rejected, (state, { payload }) => {
  //       state.loading = false;
  //       state.error = payload;
  //     });
  //   },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
