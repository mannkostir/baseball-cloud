import { createAction } from '@reduxjs/toolkit';

enum ProfilePublicAction {
  GET_CURRENT_PROFILE = 'getCurrentProfileRequested',
}

export const getCurrentProfile = createAction(
  ProfilePublicAction.GET_CURRENT_PROFILE
);
