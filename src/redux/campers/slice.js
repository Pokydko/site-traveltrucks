import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers } from "./operations";

let campersFromStorage;
try {
  campersFromStorage = JSON.parse(localStorage.getItem("favoriteCampers"));
  campersFromStorage = Array.isArray(campersFromStorage)
    ? campersFromStorage
    : [];
} catch (error) {
  campersFromStorage = [];
}

const INITIAL_STATE = {
  campers: [],
  campersLocation: "",
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
  // form: Van=PanelTruck, Fully Integrated=FullyIntegrated, or Alcove
  camperForms: {
    PanelTruck: false,
    FullyIntegrated: false,
    Alcove: false,
  },
  favorites: campersFromStorage,
  page: 1,
  ready: true,
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
    switchFavorites(state, action) {
      const index = state.favorites.indexOf(action.payload);
      if (index === -1) {
        state.favorites.push(action.payload);
      } else {
        state.favorites = state.favorites.filter((_, i) => i !== index);
      }
    },
    // setReady(state) {
    //   state.ready = true;
    // },
    refreshCampers(state) {
      state.campers = [];
      state.refresh = true;
    },
    setLocation(state, action) {
      state.campersLocation = action.payload;
    },
    setFilter(state, action) {
      if (state.filters[action.payload] === true) {
        state.filters[action.payload] = false;
        return;
      }
      if (state.camperForms[action.payload] === true) {
        state.camperForms[action.payload] = false;
        return;
      }
      switch (action.payload) {
        case "PanelTruck":
          state.camperForms.PanelTruck = true;
          state.camperForms.Alcove = false;
          state.camperForms.FullyIntegrated = false;
          break;
        case "Alcove":
          state.camperForms.PanelTruck = false;
          state.camperForms.Alcove = true;
          state.camperForms.FullyIntegrated = false;
          break;
        case "FullyIntegrated":
          state.camperForms.PanelTruck = false;
          state.camperForms.Alcove = false;
          state.camperForms.FullyIntegrated = true;
          break;

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
          if (!state.camperForms[action.payload])
            state.filters[action.payload] = true;
          break;
      }
    },
    initializeFilters(state, action) {
      Object.entries(action.payload).forEach(([key, value]) => {
        const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
        if (formattedKey === "Transmission") {
          if (value === "manual") {
            state.filters.Manual = true;
            state.filters.Automatic = false;
          } else if (value === "automatic") {
            state.filters.Automatic = true;
            state.filters.Manual = false;
          }
        } else if (formattedKey === "Engine") {
          if (value === "petrol") {
            state.filters.Petrol = true;
            state.filters.Diesel = false;
            state.filters.Hybrid = false;
          } else if (value === "diesel") {
            state.filters.Petrol = false;
            state.filters.Diesel = true;
            state.filters.Hybrid = false;
          } else if (value === "hybrid") {
            state.filters.Petrol = false;
            state.filters.Diesel = false;
            state.filters.Hybrid = true;
          }
        } else if (key === "form") {
          if (value === "panelTruck") {
            state.camperForms.PanelTruck = true;
            state.camperForms.Alcove = false;
            state.camperForms.FullyIntegrated = false;
          } else if (value === "alcove") {
            state.camperForms.PanelTruck = false;
            state.camperForms.Alcove = true;
            state.camperForms.FullyIntegrated = false;
          } else if (value === "fullyIntegrated") {
            state.camperForms.PanelTruck = false;
            state.camperForms.Alcove = false;
            state.camperForms.FullyIntegrated = true;
          }
        } else if (formattedKey in state.filters) {
          state.filters[formattedKey] = value === "true" || value === true;
        } else if (key === "location") {
          state.campersLocation = value;
        }
        state.page = 1;
        state.ready = true;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.ready = false;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isThereMore = action.payload.total > state.page * state.limit;

        if (state.refresh) state.campers = [];
        if (action.payload.items) {
          state.campers.push(...action.payload.items);
        } else {
          state.campers = [action.payload];
          state.page = 1;
          state.refresh = true;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.campers = [];
      });
  },
});

export const {
  loadMore,
  setLocation,
  setFilter,
  refreshCampers,
  initializeFilters,
  // setReady,
  switchFavorites,
} = campersSlice.actions;
export const campersReducer = campersSlice.reducer;
