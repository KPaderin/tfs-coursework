import { createAction } from '@reduxjs/toolkit';

import { type Post } from '../../types/types';
import { fetchPosts } from '../../services/fetchPosts';
import { itemsCountOnPage } from '../../configs/config';
import { like } from '../../services/like';

export const loadPostsAction = createAction('LOAD_POSTS_ACTION');

export const loadPostsSuccess = createAction<Post[]>('LOAD_POSTS_SUCCESS');

export const loadPostsFailureAction = createAction('LOAD_POSTS_FAILURE_ACTION');

export const sendPostSuccess = createAction<Post>('SEND_POST_SUCCESS');

export const sendPostFailureAction = createAction('SEND_POST_FAILURE_ACTION');

export const setLikeAction = createAction<string>('SET_LIKE_ACTION');

export const setLikeSuccess = createAction<{ like: boolean; postId: string }>(
  'SET_LIKE_SUCCESS',
);

export const setLikeFailure = createAction<string>('SET_LIKE_FAILURE');

export const loadPosts = (page): any => async (dispatch) => {
  await fetchPosts((page - 1) * itemsCountOnPage, itemsCountOnPage)
    .then((data) => dispatch(loadPostsSuccess(data)))
    .catch(() => dispatch(loadPostsFailureAction()));
};

export const setLike = (postId): any => (dispatch) => like(postId)
  .then((data) => dispatch(setLikeSuccess({ ...data, postId })))
  .catch(() => dispatch(setLikeFailure(postId)));
