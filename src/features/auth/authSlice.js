import { createSlice } from '@reduxjs/toolkit';

const tokenFromStorage = localStorage.getItem('authToken');
const userFromStorage = localStorage.getItem('authUser');

const initialState = {
  token: tokenFromStorage || null,
  user: userFromStorage ? JSON.parse(userFromStorage) : null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      localStorage.setItem('authToken', token);
      localStorage.setItem('authUser', JSON.stringify(user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
