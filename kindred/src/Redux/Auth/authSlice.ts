import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginAuth,
  signupAuth,
  type AuthUser,
  type AuthResponse,
  type LoginPayload,
  type SignupPayload,
} from "./authApi";

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isOnboarding: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};



const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isOnboarding: false,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: string }
>(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      return await loginAuth(payload);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Login failed",
      );
    }
  },
);

export const signupUser = createAsyncThunk<
  AuthResponse,
  SignupPayload,
  { rejectValue: string }
>(
  "auth/signupUser",
  async (payload, { rejectWithValue }) => {
    try {
      return await signupAuth(payload);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Signup failed",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    startOnboarding: (state) => {
      state.isOnboarding = true;
    },

    finishOnboarding: (state) => {
      state.isOnboarding = false;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isOnboarding = false;
      state.status = "idle";
      state.error = null;
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.status = "succeeded";
        state.error = null;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Login failed";
      })

      // SIGNUP
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.status = "succeeded";
        state.error = null;
      })

      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Signup failed";
      });
  },
});

export const {
  startOnboarding,
  finishOnboarding,
  logout,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;