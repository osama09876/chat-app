import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsersAPI } from "./authAPI.js";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const allUsers = createAsyncThunk(
  "auth/allUsers",
  async (data, thunkApi) => {
    try {
      const res = await getAllUsersAPI();
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "Login failed");
    }
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(allUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
