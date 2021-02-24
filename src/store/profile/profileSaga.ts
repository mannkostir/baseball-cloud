import { profilesService } from '@/services/profilesService';
import { Unpromise } from '@/types/commonTypes';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { profileActions } from '.';
import { profileInternalActions } from './profileSlice';

function* getCurrentProfileWorker(action: PayloadAction<undefined>) {
  try {
    const data: Unpromise<
      ReturnType<typeof profilesService.getCurrentProfile>
    > = yield call(profilesService.getCurrentProfile);

    yield put(profileInternalActions.getCurrentProfileSucceeded(data));
  } catch (e) {
    console.error(e);
    yield put(
      profileInternalActions.getCurrentProfileFailed({ message: e.message })
    );
  }
}

export default function* profileWatcher() {
  yield takeEvery(profileActions.getCurrentProfile, getCurrentProfileWorker);
}
