import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const instance = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers",
});

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ id, filters, page, limit = 4, search }, thunkAPI) => {
    const params = id
      ? {}
      : {
          ...createFilterQuery(filters),
          limit,
          page,
        };
    try {
      const camperId = id === undefined ? "" : `/${id}`;
      const response = await instance.get(search || camperId, {
        params,
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
        }
        return [key.length === 2 ? key : key.toLowerCase(), value];
      })
  );
}
