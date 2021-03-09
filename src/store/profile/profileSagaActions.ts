import { profilesAPI } from '@/api/profiles';
import { Unpromise } from '@/types/commonTypes';
import { createAction } from '@reduxjs/toolkit';

enum ProfilePublicAction {
  GET_CURRENT_PROFILE = 'getCurrentProfileRequested',
  UPDATE_PROFILE = 'updateProfile',
}

export const getCurrentProfile = createAction(
  ProfilePublicAction.GET_CURRENT_PROFILE
);
export const updateProfile = createAction<
  Unpromise<ReturnType<typeof profilesAPI.updateProfile>>
>(ProfilePublicAction.UPDATE_PROFILE);
