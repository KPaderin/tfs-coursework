import { createReducer } from '@reduxjs/toolkit';
import { type Post } from '../../types/types';

import {
  loadPostsAction,
  loadPostsSuccess,
  loadPostsFailureAction,
  sendPostSuccess,
  sendPostFailureAction,
  setLikeAction,
  setLikeSuccess,
  setLikeFailure,
} from './actions';

export default createReducer<Post[], any>([], (builder) => {
  builder
    .addCase(loadPostsAction, (state, action) => null)
    .addCase(loadPostsFailureAction, (state, action) => null)
    .addCase(loadPostsSuccess, (state, action) => {
      if (!state) state = [];
      state = action.payload;
      return state;
    })
    .addCase(sendPostSuccess, (state, action) => {
      state = state.concat(action.payload);
      return state;
    })
    .addCase(sendPostFailureAction, (state, action) => state)
    .addCase(setLikeSuccess, (state, action) => {
      const item = state.filter(
        (item) => item._id === action.payload.postId,
      )[0];
      item.isLiked = action.payload.like;
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      item.likes += action.payload.like ? 1 : -1;
      return state;
    })
    .addCase(setLikeFailure, (state, action) => {
      const item = state.filter((item) => item._id === action.payload)[0];
      item.isLiked = 'false';
      return state;
    })
    .addCase(setLikeAction, (state, action) => {
      const item = state.filter((item) => item._id === action.payload)[0];
      item.isLiked = 'loading';
      return state;
    });
});
