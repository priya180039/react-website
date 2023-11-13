import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isSuccess: false,
  isError: false,
  isLoading: false,
  user: null,
  message: "",
  msgEmail: "",
  msgPassword: "",
  gotErr: false,
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
        return thunkAPI.rejectWithValue(msg);
      }
    }
  }
);

export const RegisterUser = createAsyncThunk(
  "/users/Register",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/users", {
        firstName: user.inputFirst,
        lastName: user.inputLast,
        email: user.inputEmail,
        password: user.inputPassword,
        confPassword: user.inputConfirmPassword,
        role: "learner",
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
      })
      .addCase(RegisterUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RegisterUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (action.payload) {
          state.gotErr = true;
        }
        if (action.payload.includes("notEmpty on email")) {
          state.msgEmail = "Tidak boleh kosong";
        } else if (action.payload.includes("isEmail")) {
          state.msgEmail = "Email tidak valid";
        } else {
          state.msgEmail = "";
        }
        if (action.payload.includes("already registered")) {
          state.msgEmail = "Email telah terdaftar sebelumnya";
        }
        if (action.payload.includes("notEmpty on password")) {
          state.msgPassword = "Tidak boleh kosong";
        } else if (action.payload.includes("len on password")) {
          state.msgPassword = "Password minimal 8 karakter";
        }
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
