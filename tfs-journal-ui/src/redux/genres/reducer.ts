import { createReducer } from '@reduxjs/toolkit';

import { type Genre } from '../../types/types';
import {
  loadGenresFailureAction,
  loadGenresSuccess,
  loadGenresAction,
} from './actions';

export default createReducer<Genre[], any>([], (builder) => {
  builder
    .addCase(loadGenresAction, (state, action) => null)
    .addCase(loadGenresFailureAction, (state, action) => null)
    .addCase(loadGenresSuccess, (state, action) => {
      state = action.payload;
      return state;
    });
});
