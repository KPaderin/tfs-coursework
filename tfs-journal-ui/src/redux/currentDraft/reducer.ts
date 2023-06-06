import { createReducer } from '@reduxjs/toolkit';

import {
  currentDraftAction,
  currentDraftUpdateFailure,
  currentDraftUpdateSuccess,
  currentDraftLoadFailure,
  currentDraftLoadSuccess,
  currentDraftLoading,
  currentDraftDeleteFailure,
  currentDraftDeleteSuccess,
} from './actions';

export default createReducer<any | null, any>(null, (builder) => {
  builder
    .addCase(currentDraftAction, (state, action) => null)
    .addCase(currentDraftUpdateFailure, (state, action) => {
      if (!state) {
        state = {};
      }
      state.loading = false;
      state.updateStatus = false;
      return state;
    })
    .addCase(currentDraftUpdateSuccess, (state, action) => {
      if (!state) {
        state = {};
      }
      state.loading = false;
      state.updateStatus = true;
      state.draft = action.payload;
      return state;
    })
    .addCase(currentDraftLoadFailure, (state, action) => null)
    .addCase(currentDraftLoadSuccess, (state, action) => {
      if (!state) {
        state = {};
      }
      state.loading = false;
      state.draft = action.payload;
      return state;
    })
    .addCase(currentDraftLoading, (state, action) => {
      if (!state) {
        state = {};
      }
      state.loading = true;
      return state;
    })
    .addCase(currentDraftDeleteFailure, (state, action) => {
      if (!state) {
        state = {};
      }
      state.loading = false;
      state.updateStatus = false;
      return state;
    })
    .addCase(currentDraftDeleteSuccess, (state, action) => {
      state = {};
      state.loading = false;
      state.updateStatus = true;
      return state;
    });
});
