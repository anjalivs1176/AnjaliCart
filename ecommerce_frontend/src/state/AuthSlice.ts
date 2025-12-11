import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/api";   // ✅ FIXED IMPORT

// ====================== SEND OTP ======================
export const sendLoginSignupOtp = createAsyncThunk(
  "auth/sendLoginSignupOtp",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/send/login-signup-otp", {
        email,
        role: "ROLE_SELLER",
        otp: null,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send OTP"
      );
    }
  }
);

// ====================== SELLER LOGIN ======================
export const loginSeller = createAsyncThunk(
  "auth/loginSeller",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/api/seller/login", {
        email,
        password,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Invalid Credentials"
      );
    }
  }
);

// ====================== SIGNIN (Customer login) ======================
export const signin = createAsyncThunk(
  "auth/signin",       // ❌ fixed action name
  async (loginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/signin", loginRequest); // ❌ fixed missing slash
      console.log("Login otp", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Signin failed"
      );
    }
  }
);

// ====================== LOGOUT ======================
export const logout = createAsyncThunk<void, (path: string) => void>(
  "auth/logout",
  async (navigate) => {
    localStorage.clear();
    console.log("logout success");
    navigate("/"); 
  }
);


// ====================== INITIAL STATE ======================
interface AuthState {
  message: string | null;
  loading: boolean;
  error: string | null;
  token: string | null;
  user: {
    id: number;
    name: string;
    profileImage: string;
  } | null;
}

const initialState: AuthState = {
  message: null,
  loading: false,
  error: null,
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
};

// ====================== SLICE ======================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearSellerError(state) {
      state.error = null;
    },
    logoutSeller(state) {
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },

  extraReducers: (builder) => {
    builder
      // ===== OTP =====
      .addCase(sendLoginSignupOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendLoginSignupOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "OTP sent";
      })
      .addCase(sendLoginSignupOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ===== SELLER LOGIN =====
      .addCase(loginSeller.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Login successful";
        state.error = null;

        const token = action.payload?.jwt;

        if (token) {
          state.token = token;
          localStorage.setItem("token", token);
          localStorage.setItem("role", "ROLE_SELLER");
        }
      })
      .addCase(loginSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ===== SIGNIN =====
      .addCase(signin.fulfilled, (state, action) => {
        // optional: handle storing user/customer data here
      });
  },
});

// ======================
export const { clearSellerError, logoutSeller } = authSlice.actions;
export default authSlice.reducer;
