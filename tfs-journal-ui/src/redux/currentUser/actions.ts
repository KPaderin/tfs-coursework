import { createAction } from '@reduxjs/toolkit';

import { type UserProfile } from '../../types/types';
import { fetchUser } from '../../services/fetchUser';

export const loadCurrentUserAction = createAction('LOAD_CURRENT_USER_ACTION');

export const loadCurrentUserSuccess = createAction<UserProfile>(
  'LOAD_CURRENT_USER_SUCCESS',
);

export const loadCurrentUserFailureAction = createAction(
  'LOAD_CURRENT_USER_FAILURE_ACTION',
);

export const loadUser = (userId): any => (dispatch) => fetchUser(userId)
  .then((data) => dispatch(loadCurrentUserSuccess(data)))
  .catch(() => dispatch(loadCurrentUserFailureAction()));
