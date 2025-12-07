import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    logout: state => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { saveToken, saveUser, logout } = authSlice.actions;
export default authSlice.reducer;
