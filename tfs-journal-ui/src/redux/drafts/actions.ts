import { createAction } from '@reduxjs/toolkit';

import { type Draft } from '../../types/types';
import { itemsCountOnPage } from '../../configs/config';
import { fetchAllDrafts } from '../../services/fetchAllDrafts';
import { fetchUserDrafts } from '../../services/fetchUserDrafts';

export const loadDraftsAction = createAction('LOAD_DRAFTS_ACTION');

export const loadDraftsSuccess = createAction<Draft[]>('LOAD_DRAFTS_SUCCESS');

export const loadDraftsFailureAction = createAction(
  'LOAD_DRAFTS_FAILURE_ACTION',
);

export const loadAllDrafts = (page): any => async (dispatch) => {
  await fetchAllDrafts((page - 1) * itemsCountOnPage, itemsCountOnPage)
    .then((data) => dispatch(loadDraftsSuccess(data)))
    .catch(() => dispatch(loadDraftsFailureAction()));
};

export const loadDraftsForUser = (): any => async (dispatch) => await fetchUserDrafts()
  .then((data) => dispatch(loadDraftsSuccess(data)))
  .catch(() => dispatch(loadDraftsFailureAction()));
