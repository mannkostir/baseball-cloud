import authService from '@/services/authService';
import {
  SignInRequest,
  SignOutRequest,
  SignUpRequest,
  ValidateTokenRequest,
} from '@/services/authService/authServiceTypes';
import { Unpromise } from '@/types/commonTypes';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { authInternalActions } from './authSlice';
import { authActions } from '.';

function* signInWorker(action: PayloadAction<SignInRequest>) {
  try {
    const data: Unpromise<ReturnType<typeof authService.signIn>> = yield call(
      authService.signIn,
      action.payload
    );

    localStorage.setItem(
      'credentials',
      JSON.stringify({ ...data.credentials })
    );

    yield put(authInternalActions.signInSucceeded(data));
  } catch (e) {
    console.error(e);
    yield put(authInternalActions.signInFailed({ message: e.message }));
  }
}

function* signUpWorker(action: PayloadAction<SignUpRequest>) {
  try {
    const data: Unpromise<ReturnType<typeof authService.signUp>> = yield call(
      authService.signUp,
      action.payload
    );

    yield put(authInternalActions.signUpSucceeded(data));
  } catch (e) {
    console.error(e);
    yield put(authInternalActions.signUpFailed({ message: e.message }));
  }
}

function* signOutWorker(action: PayloadAction<SignOutRequest>) {
  try {
    const data: Unpromise<ReturnType<typeof authService.signOut>> = yield call(
      authService.signOut,
      action.payload
    );

    localStorage.removeItem('credentials');

    yield put(authInternalActions.signOutSucceeded(data));
  } catch (e) {
    console.error(e);
    yield put(authInternalActions.signOutFailed({ message: e.message }));
  }
}

function* validateTokenWorker(action: PayloadAction<ValidateTokenRequest>) {
  try {
    const data: Unpromise<
      ReturnType<typeof authService.validateToken>
    > = yield call(authService.validateToken, action.payload);

    yield put(authInternalActions.validateTokenSucceeded(data));
  } catch (e) {
    console.error(e);
    yield put(authInternalActions.validateTokenFailed({ message: e.message }));
  }
}

export default function* authWatcher() {
  yield takeEvery(authActions.signIn, signInWorker);
  yield takeEvery(authActions.signUp, signUpWorker);
  yield takeEvery(authActions.signOut, signOutWorker);
  yield takeEvery(authActions.validateToken, validateTokenWorker);
}
