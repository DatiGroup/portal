import type { Reducer } from '@reduxjs/toolkit';

import { combineReducers } from '@reduxjs/toolkit';

import { baseApi } from 'apiServices/baseApi';
import auth, { initialAuthState } from 'store/slices/auth/authSlice';
// import twinDashboardReducer from 'store/slices/digitalTwins/twinsDashboard/dashboardSlice';
// import digitalTwinsReducer from 'store/slices/digitalTwins/digitalTwins/digitalTwinsSlice';
import { tokenStorage } from 'utils/tokenUtils';

const appReducer = combineReducers({
  auth,
  [baseApi.reducerPath]: baseApi.reducer
  // twinDashboards: twinDashboardReducer,
  // digitalTwins: digitalTwinsReducer
});

const rootReducer: Reducer = (state: RootState, action) => {
  if (action.type === 'RESET_APP') {
    tokenStorage.clearAuthData();
    //Here we can  preserve state in reset if neededs
    state = {} as RootState;
    state = {
      ...state,
      auth: initialAuthState
    };
    return appReducer(state, action);
  } else {
    return appReducer(state, action);
  }
};

export type RootState = ReturnType<typeof appReducer>;

export type RootSlices = keyof RootState;

export default rootReducer;
