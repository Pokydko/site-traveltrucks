import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const instance = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers",
});

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ id, filter, page = 1 }, thunkAPI) => {
    // Фільтри мають бути тільки для властивостей зі значенням true
    const filters = filter
      ? Object.fromEntries(
          Object.entries(filter).filter(([key, value]) => value === true)
        )
      : {};

    const params = {
      page,
      limit: 4,
      ...filters, // додаємо фільтри в запит
    };

    try {
      const camperId = id === undefined ? "" : `/${id}`;
      const response = await instance.get(camperId, {
        params: params,
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
