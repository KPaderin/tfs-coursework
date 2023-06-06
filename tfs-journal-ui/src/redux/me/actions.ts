import { createAction } from '@reduxjs/toolkit';

import { tfsAuthorization } from '../../configs/config';
import { fetchMe } from '../../services/fetchMe';
import { updateUser } from '../../services/updateUser';

export const loadUserFromLocalAction = createAction(
  'LOAD_USER_FROM_LOCAL_ACTION',
);

export const loadUserFromLocalSuccess = createAction(
  'LOAD_USER_FROM_LOCAL_SUCCESS',
);

export const loadUserFromLocalFailure = createAction(
  'LOAD_USER_FROM_LOCAL_FAILURE',
);

export const userLogout = createAction('USER_LOGOUT');

export const authorizationWithGoogleAction = createAction(
  'AUTHORIZATION_WITH_GOOGLE',
);

export const authorizationWithGoogleSuccess = createAction(
  'AUTHORIZATION_WITH_GOOGLE_SUCCESS',
);

export const authorizationWithGoogleFailure = createAction(
  'AUTHORIZATION_WITH_GOOGLE_FAILURE',
);

export const updateUserImageSuccess = createAction<string>(
  'UPDATE_USER_IMAGE_SUCCESS',
);

export const updateUserImageFailure = createAction('UPDATE_USER_IMAGE_FAILURE');

export const updateUserImageAction = createAction('UPDATE_USER_IMAGE_ACTION');

export const updateUserNameSuccess = createAction<string>(
  'UPDATE_USER_NAME_SUCCESS',
);

export const updateUserNameFailure = createAction('UPDATE_USER_NAME_FAILURE');

export const updateUserNameAction = createAction('UPDATE_USER_NAME_ACTION');

export const loadUserFromLocal = (): any => (dispatch) => fetchMe()
  .then((data) => dispatch(loadUserFromLocalSuccess(data)))
  .catch(() => dispatch(loadUserFromLocalFailure()));

export const authWithGoogle = (payload): any => (dispatch) => {
  localStorage.setItem(tfsAuthorization, payload.access_token);
  return fetchMe()
    .then((data) => dispatch(authorizationWithGoogleSuccess(data)))
    .catch(() => dispatch(authorizationWithGoogleFailure()));
};

export const logoutMe = (): any => (dispatch) => {
  localStorage.removeItem(tfsAuthorization);
  return dispatch(userLogout());
};

export const updateUserImage = (image): any => (dispatch) => {
  updateUser(null, image)
    .then((res) => dispatch(updateUserImageSuccess(res.image)))
    .catch(() => dispatch(updateUserImageFailure()));
};

export const updateUserName = (userName): any => (dispatch) => {
  updateUser(userName, null)
    .then((res) => dispatch(updateUserNameSuccess(res.name)))
    .catch(() => dispatch(updateUserNameFailure()));
};
