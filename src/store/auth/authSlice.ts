import {
  SignInResponse,
  SignOutResponse,
  SignUpResponse,
  ValidateTokenResponse,
} from '@/services/authService/authServiceTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './authStoreTypes';

export const defaultAuth: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: defaultAuth,
  reducers: {
    signInSucceeded(state, action: PayloadAction<SignInResponse>) {
      state.user = action.payload.data;
    },
    signInFailed(state, action: PayloadAction<{ message: string }>) {},
    signUpSucceeded(state, action: PayloadAction<SignUpResponse>) {},
    signUpFailed(state, action: PayloadAction<{ message: string }>) {},
    signOutSucceeded(state, action: PayloadAction<SignOutResponse>) {},
    signOutFailed(state, action: PayloadAction<{ message: string }>) {},
    validateTokenSucceeded(
      state,
      action: PayloadAction<ValidateTokenResponse>
    ) {
      state.user = action.payload.data;
    },
    validateTokenFailed(state, action: PayloadAction<{ message: string }>) {},
  },
});

export const authInternalActions = authSlice.actions;
export default authSlice.reducer;
