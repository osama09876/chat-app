import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerAPI, loginAPI } from "./authAPI.js";

const initialState = {
  user: null,
  loading: null,
  error: null,
};

// 🔥 Async login
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, thunkApi) => {
    try {
      const res = await registerAPI(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(res.response?.data || "Login failed");
    }
  },
);

// 🔥 Async login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, thunkApi) => {
    try {
      const res = await loginAPI(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(res.response?.data || "Login failed");
    }
  },
);

// 🔥 Async logout
export const userLogout = createAsyncThunk(
  "auth/userLogout",
  async (_, thunkApi) => {
    try {
      await loginAPI(data);
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
