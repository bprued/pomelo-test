import { configureStore } from '@reduxjs/toolkit'
import articleReducer from './slice/article'

export const store = configureStore({
  reducer: {
    article: articleReducer,
  }
});
