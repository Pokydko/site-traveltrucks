import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const instance = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers",
});

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ id, limit = 4, page = 1 }, thunkAPI) => {
    const urlParams = Object.fromEntries(new URLSearchParams(location.search));
    urlParams.limit = limit;
    urlParams.page = page;

    try {
      const camperId = id === undefined ? "" : `/${id}`;
      const response = await instance.get(camperId, {
        params: urlParams,
        headers: {
          accept: "application/json",
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

export function createFilterQuery(filterObj) {
  return Object.fromEntries(
    Object.entries(filterObj)
      .filter(([, value]) => {
        return value === true;
      })
      .map(([key, value]) => {
        if (["Automatic", "Manual"].includes(key)) {
          return ["transmission", key.toLowerCase()];
        } else if (["Petrol", "Diesel", "Hybrid"].includes(key)) {
          return ["engine", key.toLowerCase()];
        } else if (["PanelTruck", "FullyIntegrated", "Alcove"].includes(key)) {
          return ["form", checkForm(key)];
        }
        return [key.length === 2 ? key : key.toLowerCase(), value];
      })
  );
}
function checkForm(key) {
  if (key === "PanelTruck") return "panelTruck";
  if (key === "FullyIntegrated") return "fullyIntegrated";
  if (key === "Alcove") return "alcove";
}
