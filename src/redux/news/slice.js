import { createSlice } from '@reduxjs/toolkit';
import { fetchAll, fetchId } from './operations';

const initialState = {
  items: [],
  currentNews: null,
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload ?? [];
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      })
      // fetchId
      .addCase(fetchId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchId.fulfilled, (state, action) => {
        state.loading = false;
        state.currentNews = action.payload ?? null;
      })
      .addCase(fetchId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export const newsReducer = newsSlice.reducer;
