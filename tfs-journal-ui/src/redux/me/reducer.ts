import { createReducer } from '@reduxjs/toolkit';
import { type Post } from '../../types/types';

import {
  loadUserFromLocalAction,
  loadUserFromLocalSuccess,
  loadUserFromLocalFailure,
  userLogout,
  authorizationWithGoogleAction,
  authorizationWithGoogleFailure,
  authorizationWithGoogleSuccess,
  updateUserImageFailure,
  updateUserImageSuccess,
  updateUserImageAction,
  updateUserNameAction,
  updateUserNameFailure,
  updateUserNameSuccess,
} from './actions';

export default createReducer<Post | null, any>(null, (builder) => {
  builder
    .addCase(loadUserFromLocalAction, (state, action) => null)
    .addCase(userLogout, (state, action) => null)
    .addCase(loadUserFromLocalFailure, (state, action) => null)
    .addCase(loadUserFromLocalSuccess, (state, action) => {
      state = action.payload;
      return state;
    })
    .addCase(authorizationWithGoogleAction, (state, action) => null)
    .addCase(authorizationWithGoogleFailure, (state, action) => null)
    .addCase(authorizationWithGoogleSuccess, (state, action) => {
      state = action.payload;
      return state;
    })
    .addCase(updateUserImageFailure, (state, action) => {
      delete state.userImageLoading;
      return state;
    })
    .addCase(updateUserImageSuccess, (state, action) => {
      delete state.userImageLoading;
      state.image = action.payload;
      return state;
    })
    .addCase(updateUserImageAction, (state, action) => {
      state.userImageLoading = true;
      return state;
    })
    .addCase(updateUserNameFailure, (state, action) => {
      delete state.userNameLoading;
      return state;
    })
    .addCase(updateUserNameSuccess, (state, action) => {
      delete state.userNameLoading;
      state.name = action.payload;
      return state;
    })
    .addCase(updateUserNameAction, (state, action) => {
      state.userNameLoading = true;
      return state;
    });
});
