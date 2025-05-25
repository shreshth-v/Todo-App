import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../utils/apiClient";
import { toast } from "react-toastify";

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("auth/login", credentials);
      toast.success("Login successful");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return rejectWithValue(err.response.data);
    }
  }
);

// Register
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("auth/signup", userData);
      toast.success("User registered successfully");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      return rejectWithValue(err.response.data);
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await apiClient.post("auth/logout");
      toast.success("Logout successful");
      return null;
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
      return rejectWithValue(err.response.data);
    }
  }
);

// Check Auth
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/auth/check");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })

      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CheckAuth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
