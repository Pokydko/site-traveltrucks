import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const instance = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers",
});

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ id, filter, page = 1 }, thunkAPI) => {
    const params = id
      ? {}
      : {
          page,
          limit: 4,
          filter,
        };

    try {
      const response = await instance.get(id ? `/${id}` : "", {
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
