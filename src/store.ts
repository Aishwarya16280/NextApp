// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../src/app/features/usersSlice';  // <-- make sure path is correct

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
