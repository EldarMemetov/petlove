import { configureStore } from '@reduxjs/toolkit';
import { newsReducer } from './news/slice';
import { persistStore } from 'redux-persist';

export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/FLUSH',
          'persist/PAUSE',
          'persist/REHYDRATE',
          'persist/REGISTER',
        ],
      },
    }),
});

export const persistor = persistStore(store);
