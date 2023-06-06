import { createAction } from '@reduxjs/toolkit';
import { fetchGenres } from '../../services/fetchGenres';
import { type Genre } from '../../types/types';

export const loadGenresAction = createAction('LOAD_GENRES_ACTION');

export const loadGenresSuccess = createAction<Genre[]>('LOAD_GENRES_SUCCESS');

export const loadGenresFailureAction = createAction(
  'LOAD_GENRES_FAILURE_ACTION',
);

export const loadGenres = (): any => async (dispatch) => await fetchGenres()
  .then((data) => dispatch(loadGenresSuccess(data)))
  .catch(() => dispatch(loadGenresFailureAction()));
