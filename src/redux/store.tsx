import { configureStore, combineReducers } from '@reduxjs/toolkit';

import config from './entities/config';

export const reducer = combineReducers({
  config
});

const store = configureStore({
  reducer,
});

export default store;

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;