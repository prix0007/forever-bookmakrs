import { configureStore } from '@reduxjs/toolkit';
import { bookmarkSlice } from './slices/bookmarks';


const store = configureStore({
  reducer: bookmarkSlice.reducer
});

export type RootState = ReturnType<typeof store.getState>

export default store;