import { createReducer } from '@reduxjs/toolkit';
import { type Post } from '../../types/types';

import {
  loadCurrentPostAction,
  loadCurrentPostSuccess,
  loadCurrentPostFailureAction,
  sendingCommentAction,
  sendingCommentFailure,
  sendingCommentSuccess,
  setLikeSuccess,
  setLikeFailure,
  setLikeAction,
} from './actions';

export default createReducer<Post | null, any>(null, (builder) => {
  builder
    .addCase(loadCurrentPostAction, (state, action) => {
      state = {};
      state.loading = true;
      return state;
    })
    .addCase(loadCurrentPostFailureAction, (state, action) => null)
    .addCase(loadCurrentPostSuccess, (state, action) => {
      state = action.payload;
      state.loading = false;
      return state;
    })
    .addCase(sendingCommentAction, (state, action) => {
      state.sendingComment = true;
      return state;
    })
    .addCase(sendingCommentSuccess, (state, action) => {
      state.comments = [action.payload].concat(state.comments);
      delete state.sendingComment;
      return state;
    })
    .addCase(sendingCommentFailure, (state, action) => {
      delete state.sendingComment;
      return state;
    })
    .addCase(setLikeSuccess, (state, action) => {
      state.isLiked = action.payload.like;
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      state.likes += action.payload.like ? 1 : -1;
      return state;
    })
    .addCase(setLikeFailure, (state, action) => {
      state.isLiked = 'false';
      return state;
    })
    .addCase(setLikeAction, (state, action) => {
      state.isLiked = 'loading';
      return state;
    });
});
