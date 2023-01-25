import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import authReducer from "./slices/authSlice";

export const todoStore = configureStore({
  reducer: {
    todo: todoReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof todoStore.getState>;
export type AppDispatch = typeof todoStore.dispatch;
