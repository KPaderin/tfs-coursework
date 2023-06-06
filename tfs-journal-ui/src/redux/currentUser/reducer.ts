import { createReducer } from '@reduxjs/toolkit';
import { type UserProfile } from '../../types/types';

import {
  loadCurrentUserAction,
  loadCurrentUserFailureAction,
  loadCurrentUserSuccess,
} from './actions';

export default createReducer<UserProfile | null, any>(null, (builder) => {
  builder
    .addCase(loadCurrentUserAction, (state, action) => null)
    .addCase(loadCurrentUserFailureAction, (state, action) => null)
    .addCase(loadCurrentUserSuccess, (state, action) => {
      state = action.payload;
      return state;
    });
});
