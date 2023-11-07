import { configureStore, combineReducers } from '@reduxjs/toolkit';
import moviesSlice from './moviesSlice';

const rootReducer = combineReducers({
  movies: moviesSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
