import { createAction } from '@reduxjs/toolkit';

import { type Draft } from '../../types/types';
import { createOrUpdateDraft } from '../../services/createOrUpdateDraft';
import { fetchDraft } from '../../services/fetchDraft';
import { createPostFromDraft } from '../../services/createPostFromDraft';
import { fetchPost } from '../../services/fetchPost';
import { updatePost } from '../../services/updatePost';
import { deleteDraft } from '../../services/deleteDraft';

export const currentDraftAction = createAction('CURRENT_DRAFT_ACTION');

export const currentDraftLoading = createAction('CURRENT_DRAFT_LOADING');

export const currentDraftUpdateSuccess = createAction<Draft>(
  'CURRENT_DRAFT_UPDATE_SUCCESS',
);

export const currentDraftUpdateFailure = createAction(
  'CURRENT_DRAFT_UPDATE_FAILURE',
);

export const currentDraftLoadSuccess = createAction<Draft>(
  'CURRENT_DRAFT_LOAD_SUCCESS',
);

export const currentDraftLoadFailure = createAction(
  'CURRENT_DRAFT_LOAD_FAILURE',
);

export const currentDraftDeleteFailure = createAction(
  'CURRENT_DRAFT_DELETE_FAILURE',
);

export const currentDraftDeleteSuccess = createAction<Draft>(
  'CURRENT_DRAFT_DELETE_SUCCESS',
);

export const saveDraft = (input): any => async (dispatch) => await createOrUpdateDraft({ ...input })
  .then((data) => dispatch(currentDraftUpdateSuccess(data)))
  .catch(() => dispatch(currentDraftUpdateFailure()));

export const loadDraft = (_id): any => async (dispatch) => await fetchDraft(_id)
  .then((data) => dispatch(currentDraftLoadSuccess(data)))
  .catch(() => dispatch(currentDraftLoadFailure()));

export const loadPostAsDraft = (_id): any => async (dispatch) => await fetchPost(_id)
  .then((data) => dispatch(currentDraftLoadSuccess(data)))
  .catch(() => dispatch(currentDraftLoadFailure()));

export const publishDraft = (input): any => async (dispatch) => {
  await createPostFromDraft({ ...input })
    .then((data) => dispatch(currentDraftUpdateSuccess(data)))
    .catch(() => dispatch(currentDraftUpdateFailure()));
};

export const saveEditedPost = (input): any => async (dispatch) => await updatePost({ ...input })
  .then((data) => dispatch(currentDraftUpdateSuccess(data)))
  .catch(() => dispatch(currentDraftUpdateFailure()));

export const deleteCurrentDraft = (postId): any => async (dispatch) => await deleteDraft(postId)
  .then((data) => dispatch(currentDraftDeleteSuccess(data)))
  .catch(() => dispatch(currentDraftDeleteFailure()));
