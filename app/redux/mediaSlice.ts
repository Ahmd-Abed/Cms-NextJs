import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchMediaData } from "../services/mediaServices";
import {
  ImagesItem,
  VideosItem,
  PublicationsItem,
} from "@/app/models/mediaModel";

export interface mediaState {
  Images: ImagesItem[] | [];
  Videos: VideosItem[] | [];
  Publications: PublicationsItem[] | [];
  loading: boolean;
  error: string | null;
}

const initialState: mediaState = {
  Images: [],
  Videos: [],
  Publications: [],
  loading: false,
  error: null,
};

// Fetch home page data from an API
export const fetchMediaPageData = createAsyncThunk(
  "media/fetchMediaPageData",
  async () => {
    const data = await fetchMediaData();
    return data.toPlainObject(); // Return plain object
  }
);

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle loading state for fetching media page data
      .addCase(fetchMediaPageData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle successful media page data fetching
      .addCase(
        fetchMediaPageData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.Images = action.payload.Images;
          state.Videos = action.payload.Videos;
          state.Publications = action.payload.Publications;
        }
      )
      // Handle failed media page data fetching
      .addCase(fetchMediaPageData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch media  data";
      });
  },
});

export default mediaSlice.reducer;
