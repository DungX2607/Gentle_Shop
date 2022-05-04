import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import authReducer from './reducers/authSlice';
import localReducer from './reducers/localSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    local:localReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: false})
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
