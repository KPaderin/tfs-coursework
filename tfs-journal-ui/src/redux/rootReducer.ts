import { combineReducers } from '@reduxjs/toolkit';

import postReducer from './posts/reducer';
import currentPostReducer from './currentPost/reducer';
import meReducer from './me/reducer';
import draftsReducer from './drafts/reducer';
import currentDraftReducer from './currentDraft/reducer';
import genresReducer from './genres/reducer';
import currentUserReducer from './currentUser/reducer';

export default combineReducers({
  posts: postReducer,
  currentPost: currentPostReducer,
  me: meReducer,
  drafts: draftsReducer,
  currentDraft: currentDraftReducer,
  genres: genresReducer,
  currentUser: currentUserReducer,
});
