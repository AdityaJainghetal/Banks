import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createHFBank,
  AllHFBank,
  GetHFBankById,
} from "../../../api-services/HFBank/HFBankApi";

// Create new HF Bank
export const createHFBanks = createAsyncThunk(
  "hfbanks/createHFBank",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createHFBank(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get all HF Banks
export const fetchAllHFBanks = createAsyncThunk(
  "hfbanks/fetchAllHFBanks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AllHFBank();

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get HF Bank by ID
export const fetchHFBankById = createAsyncThunk(
  "hfbanks/fetchHFBankById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await GetHFBankById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
