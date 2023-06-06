import { createAction } from '@reduxjs/toolkit';

import { type CommentType, type Post } from '../../types/types';
import { fetchPost } from '../../services/fetchPost';
import { sendComment } from '../../services/sendComment';
import { like } from '../../services/like';

export const loadCurrentPostAction = createAction('LOAD_CURRENT_POST_ACTION');

export const loadCurrentPostSuccess = createAction<Post>(
  'LOAD_CURRENT_POST_SUCCESS',
);

export const loadCurrentPostFailureAction = createAction(
  'LOAD_CURRENT_POST_FAILURE_ACTION',
);

export const sendingCommentAction = createAction('SENDING_COMMENT_ACTION');

export const sendingCommentSuccess = createAction<CommentType>(
  'SENDING_COMMENT_SUCCESS',
);

export const sendingCommentFailure = createAction('SENDING_COMMENT_FAILURE');

export const setLikeAction = createAction('SET_LIKE_CURRENT_ACTION');

export const setLikeSuccess = createAction<{ like: boolean }>(
  'SET_LIKE_CURRENT_SUCCESS',
);

export const setLikeFailure = createAction('SET_LIKE_CURRENT_FAILURE');

export const loadPost = (postId): any => async (dispatch) => await fetchPost(postId)
  .then((data) => dispatch(loadCurrentPostSuccess(data)))
  .catch(() => dispatch(loadCurrentPostFailureAction()));

export const postComment = (postId, value): any => (dispatch) => sendComment(postId, value)
  .then((data) => dispatch(sendingCommentSuccess(data)))
  .catch(() => dispatch(sendingCommentFailure()));

export const setLike = (postId): any => (dispatch) => like(postId)
  .then((data) => dispatch(setLikeSuccess(data)))
  .catch(() => dispatch(setLikeFailure(postId)));
