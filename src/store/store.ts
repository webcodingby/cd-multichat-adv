import { configureStore } from "@reduxjs/toolkit";

import mainSlice from './slices/mainSlice/mainSlice';
import apiSlice from "./slices/apiSlice/apiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    mainSlice,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: true,
    })
    .concat(apiSlice.middleware),
  // devTools: process?.env?.NODE_ENV !== 'production',
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;