import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ViewState } from './viewStoreTypes';
export const defaultView: ViewState = {
  isShowingLoadingScreen: false,
};

const viewSlice = createSlice({
  name: 'view',
  initialState: defaultView,
  reducers: {
    setIsLoadingScreenVisible(
      state,
      action: PayloadAction<{ isVisible: boolean }>
    ) {
      state.isShowingLoadingScreen = action.payload.isVisible;
    },
  },
});

export const viewActions = viewSlice.actions;
export default viewSlice.reducer;
