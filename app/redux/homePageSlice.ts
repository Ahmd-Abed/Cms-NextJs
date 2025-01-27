import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { homePageModel } from "../models/homePageModel";
import { fetchHomePageData } from "../services/homePageServices";
interface HomePageData {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    NavBar: Array<object>;
    ContentHomePage: Array<object>;
    carousel_collections: Array<object>;
    news_collections: Array<object>;
  };
  meta: object;
}
interface HomePageState {
  // homePageData: homePageModel | null;
  homePageData?: HomePageData; // Update to hold an array of contracts
  loading: boolean;
  error: string | null;
}

const initialState: HomePageState = {
  homePageData: undefined,
  loading: false,
  error: null,
};

// Fetch contract data from an API
export const fetchHomeData = createAsyncThunk(
  "homePage/fetchHomeData",
  async () => {
    return await fetchHomePageData(); // Fetch fetchHomePageData from the service
  }
);

const homePageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle loading state for fetching contracts data
      .addCase(fetchHomeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle successful contract data fetching
      .addCase(fetchHomeData.fulfilled, (state, action: any) => {
        state.loading = false;
        //console.log("beslice ", action.payload.toPlainObject());
        console.log("beslice test ", action.payload);
        state.homePageData = action.payload;
      })
      // Handle failed contract data fetching
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch contract data";
      });
  },
});

export default homePageSlice.reducer;
