import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const instance = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/",
});

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ id = "", query = "", page = 1 }, thunkAPI) => {
    try {
      const response = await instance.get(`campers/${id}`, {
        params: {
          search: query,
          page: page,
        },
        headers: {
          accept: "application/json",
        },
      });

      console.dir(response.data.items);

      return response.data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);
