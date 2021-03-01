import { authActions } from '.';
import {
  SignInResponse,
  SignOutResponse,
  SignUpResponse,
  ValidateTokenResponse,
} from '@/services/authService/authServiceTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './authStoreTypes';
import { UserCredentials } from '@/types/commonTypes';

export const defaultAuth: AuthState = {
  userId: null,
  isLoading: false,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: defaultAuth,
  reducers: {
    signInSucceeded(
      state,
      action: PayloadAction<SignInResponse & { credentials: UserCredentials }>
    ) {
      state.userId = action.payload.data.id;
      state.isLoading = false;
      state.error = '';

      localStorage.setItem(
        'credentials',
        JSON.stringify({ ...action.payload.credentials })
      );
    },
    signInFailed(state, action: PayloadAction<{ message: string }>) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    signUpSucceeded(state, action: PayloadAction<SignUpResponse>) {
      state.isLoading = false;
      state.error = '';
    },
    signUpFailed(state, action: PayloadAction<{ message: string }>) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    signOutSucceeded(state, action: PayloadAction<SignOutResponse>) {
      localStorage.removeItem('credentials');
      return defaultAuth;
    },
    signOutFailed(state, action: PayloadAction<{ message: string }>) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    validateTokenSucceeded(
      state,
      action: PayloadAction<ValidateTokenResponse>
    ) {
      state.userId = action.payload.data.id;
      state.isLoading = false;
      state.error = '';
    },
    validateTokenFailed(state, action: PayloadAction<{ message: string }>) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(authActions.signIn, (state) => {
        state.isLoading = true;
      })
      .addCase(authActions.signUp, (state) => {
        state.isLoading = true;
      })
      .addCase(authActions.signOut, (state) => {
        state.isLoading = true;
      })
      .addCase(authActions.validateToken, (state) => {
        state.isLoading = true;
      }),
});

export const authInternalActions = authSlice.actions;
export default authSlice.reducer;
