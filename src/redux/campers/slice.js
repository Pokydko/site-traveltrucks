import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers } from "./operations";

const INITIAL_STATE = {
  campers: [],
  page: 1,
  lastPagination: 0,
  limit: 4,
  refresh: true,
  isThereMore: false,
  loading: false,
  error: null,
};

const campersSlice = createSlice({
  name: "campers",
  initialState: INITIAL_STATE,
  reducers: {
    loadMore(state) {
      state.page += 1;
      state.refresh = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isThereMore =
          action.payload.total <= state.page * state.limit ? false : true;
        state.lastPagination = state.page;

        if (state.refresh) state.campers = [];
        if (action.payload.items) {
          state.campers.push(...action.payload.items);
        } else {
          state.campers = [action.payload];
          state.page = 1;
          state.lastPagination = 0;
          state.refresh = true;
        }

        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loadMore } = campersSlice.actions;
export const campersReducer = campersSlice.reducer;
