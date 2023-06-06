import { createReducer } from '@reduxjs/toolkit';
import { type Draft } from '../../types/types';

import {
  loadDraftsAction,
  loadDraftsSuccess,
  loadDraftsFailureAction,
} from './actions';

export default createReducer<Draft[], any>([], (builder) => {
  builder
    .addCase(loadDraftsAction, (state, action) => null)
    .addCase(loadDraftsFailureAction, (state, action) => null)
    .addCase(loadDraftsSuccess, (state, action) => {
      state = action.payload;
      return state;
    });
});
