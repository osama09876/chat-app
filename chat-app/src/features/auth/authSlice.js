import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerAPI, loginAPI, logoutAPI } from "./authAPI.js";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

// 🔥 Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, thunkApi) => {
    try {
      const res = await registerAPI(data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data || "Register failed",
      );
    }
  },
);

// 🔥 Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, thunkApi) => {
    try {
      const res = await loginAPI(data);
      // console.log(res.data);
      
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "Login failed");
    }
  },
);

// 🔥 Logout
export const userLogout = createAsyncThunk(
  "auth/userLogout",
  async (_, thunkApi) => {
    try {
      await logoutAPI();
      return true;
    } catch (error) {
      return thunkApi.rejectWithValue("Logout failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGOUT
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;

        localStorage.removeItem("user");
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
