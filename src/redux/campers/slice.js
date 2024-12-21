import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers } from "./operations";

const INITIAL_STATE = {
  campers: [],
  filters: {
    AC: false,
    Bathroom: false,
    Kitchen: false,
    TV: false,
    Radio: false,
    Refrigerator: false,
    Microwave: false,
    Gas: false,
    Water: false,

    // engine: "diesel", "hybrid" or "petrol"
    Petrol: false,
    Diesel: false,
    Hybrid: false,

    // transmission: "automatic" or "manual"
    Automatic: false,
    Manual: false,
  },
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
    refreshCampers(state) {
      state.campers = [];
    },
    setFilter(state, action) {
      if (state.filters[action.payload] === true) {
        state.filters[action.payload] = false;
        return;
      }
      switch (action.payload) {
        case "Automatic":
          state.filters.Automatic = true;
          state.filters.Manual = false;
          break;
        case "Manual":
          state.filters.Manual = true;
          state.filters.Automatic = false;
          break;

        case "Petrol":
          state.filters.Petrol = true;
          state.filters.Diesel = false;
          state.filters.Hybrid = false;
          break;
        case "Diesel":
          state.filters.Petrol = false;
          state.filters.Diesel = true;
          state.filters.Hybrid = false;
          break;
        case "Hybrid":
          state.filters.Petrol = false;
          state.filters.Diesel = false;
          state.filters.Hybrid = true;
          break;

        default:
          state.filters[action.payload] = true;
          break;
      }
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

        // if (action.meta.arg.filter) state.campers = [];
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

export const { loadMore, setFilter, refreshCampers } = campersSlice.actions;
export const campersReducer = campersSlice.reducer;
