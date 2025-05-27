import { configureStore } from '@reduxjs/toolkit';
import hsnsacReducer from '../src/app/features/hsnsacSlice';

export const store = configureStore({
  reducer: {
    hsnsac: hsnsacReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
