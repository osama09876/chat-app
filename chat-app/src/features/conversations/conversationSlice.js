import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createGroupConversation } from "./conversationApi";
import { create_group_URL } from "../../api/api";
import axios from "axios";

const initialState = {
  conversationid: null,
  loading: false,
  error: false,
};

export const createGroup = createAsyncThunk(
  "/conversation/createGroup",
  async (data, thunkApi) => {
    try {
      const conversation = await createGroupConversation(data);
      return conversation.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "Error occured");
    }
  },
);

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.conversationid = action.payload.conversationid;
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default conversationSlice.reducer;
