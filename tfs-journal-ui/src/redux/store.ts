import { configureStore } from '@reduxjs/toolkit';
import { type AnyAction } from 'redux';
import reduxThunk, { type ThunkDispatch } from 'redux-thunk';

import rootReducer from './rootReducer';

import {
  type Post,
  type Me,
  type Draft,
  type Genre,
  type UserProfile,
} from '../types/types';

export interface RootState {
  posts?: Post[];
  currentPost?: Post & {
    sendingComment?: boolean;
    loading?: boolean;
  };
  me?: Me & {
    userNameLoading?: boolean;
    userImageLoading?: boolean;
  };
  drafts?: Draft[];
  currentDraft?: {
    draft?: Draft;
    updateStatus?: boolean;
    loading?: boolean;
  };
  genres?: Genre[];
  currentUser?: UserProfile;
}

type Dispatch = ThunkDispatch<RootState, void, AnyAction>;

const initialState = {
  posts: [],
  currentPost: {},
  me: null,
  drafts: null,
  currentDraft: null,
  genres: null,
  currentUser: null,
};

const store = configureStore<Dispatch>({
  preloadedState: initialState,
  reducer: rootReducer,
  middleware: [reduxThunk],
});

export default store;
