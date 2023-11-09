import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isSuccess: false,
  isError: false,
  isLoading: false,
  user: null,
  message: "",
};

export const LoginUser = createAsyncThunk(
  "/users/Login",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: user.inputEmail,
        password: user.inputPassword,
      });
      return response.data;
    } catch (err) {
      if (err.response) {
        const msg = err.response.data.message;
        console.log(msg);
        return thunkAPI.rejectWithValue(msg);
      }
    }
  }
);

export const LogoutUser = createAsyncThunk("user/Logout", async () => {
  await axios.delete("http://localhost:5000/logout");
  console.log("Logged Out");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builders) => {
    builders
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
