import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const accessToken = localStorage.getItem('accessToken');
  const tokenExpire = localStorage.getItem('tokenExpire');
  const now = new Date();

  if (!accessToken || new Date(tokenExpire) < now) {
    return false;
  } else {
    return true;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    accessToken: null,
    tokenExpire: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.tokenExpire = action.payload.expire;

      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('tokenExpire', action.payload.expire);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.tokenExpire = null;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('tokenExpire');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload;
      });
  },
});

export const { login, logout/*, checkAuth*/ } = authSlice.actions;
export default authSlice.reducer;
