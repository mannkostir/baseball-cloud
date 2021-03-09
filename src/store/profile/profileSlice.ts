import { profilesAPI } from '@/api/profiles';
import { Unpromise } from '@/types/commonTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { profileActions } from '.';
import { ProfileState } from './profileStoreTypes';

export const defaultProfile: ProfileState = {
  avatar: null,
  firstName: '',
  fullName: '',
  currentProfileId: '',
  lastName: '',
  isLoading: false,
  error: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: defaultProfile,
  reducers: {
    getCurrentProfileSucceeded(
      state,
      action: PayloadAction<
        Unpromise<ReturnType<typeof profilesAPI.getCurrentProfile>>
      >
    ) {
      state.firstName = action.payload.first_name;
      state.lastName = action.payload.last_name;
      state.fullName = `${action.payload.first_name || ''} ${
        action.payload.last_name || ''
      }`;
      state.avatar = action.payload.avatar;
      state.currentProfileId = action.payload.id;

      state.isLoading = false;
      state.error = '';
    },
    getCurrentProfileFailed(state, action: PayloadAction<{ message: string }>) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(profileActions.getCurrentProfile, (state) => {
        state.isLoading = true;
      })
      .addCase(profileActions.updateProfile, (state, action) => {
        state.firstName = action.payload.first_name;
        state.lastName = action.payload.last_name;
        state.avatar = action.payload.avatar;
        state.fullName = `${action.payload.first_name || ''} ${
          action.payload.last_name || ''
        }`;
      }),
});

export const profileInternalActions = profileSlice.actions;
export default profileSlice.reducer;
