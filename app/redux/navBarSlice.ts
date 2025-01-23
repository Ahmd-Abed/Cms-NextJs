import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchNavBarData } from "../services/navBarPageServices";

interface NavbarItem {
  id: number;
  Label: string;
  Link: string;
  IsShown: boolean;
}

interface NavbarState {
  navbarData: NavbarItem[];
  loading: boolean;
  error: string | null;
}

const initialState: NavbarState = {
  navbarData: [],
  loading: false,
  error: null,
};

// Create async thunk for fetching navbar data
export const fetchNavbarData = createAsyncThunk(
  "navbar/fetchNavbarData",
  async () => {
    return await fetchNavBarData(); // Fetch navbar data from the service
  }
);

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle loading state
      .addCase(fetchNavbarData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle successful data fetching
      .addCase(fetchNavbarData.fulfilled, (state, action: any) => {
        state.loading = false;
        state.navbarData = action.payload;
      })
      // Handle failed data fetching
      .addCase(fetchNavbarData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch navbar data";
      });
  },
});

export default navbarSlice.reducer;
