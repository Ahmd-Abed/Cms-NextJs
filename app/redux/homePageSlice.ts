import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchHomePageData } from "../services/homePageServices";
import {
  NavbarItem,
  Carousel,
  About,
  News,
  QuickLinks,
  FooterItem,
  Faq,
} from "@/app/models/homePageModel";

export interface HomePageState {
  NavBar: NavbarItem[] | [];
  Carousel: Carousel[] | [];
  About: About[] | [];
  News: News[] | [];
  QuickLinks: QuickLinks[] | [];
  Faq: Faq[] | [];
  Footer: FooterItem[] | [];
  loading: boolean;
  error: string | null;
}

const initialState: HomePageState = {
  NavBar: [],
  Carousel: [],
  About: [],
  News: [],
  QuickLinks: [],
  Faq: [],
  Footer: [],
  loading: false,
  error: null,
};

// Fetch home page data from an API
export const fetchHomeData = createAsyncThunk(
  "homePage/fetchHomeData",
  async () => {
    const data = await fetchHomePageData();
    return data.toPlainObject(); // Return plain object
  }
);

const homePageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle loading state for fetching home page data
      .addCase(fetchHomeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle successful home page data fetching
      .addCase(fetchHomeData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.NavBar = action.payload.NavBar;
        state.Carousel = action.payload.carousel_collections;
        state.News = action.payload.news_collections;
        state.QuickLinks = action.payload.quick_links;
        state.Faq = action.payload.Faq;
        state.Footer = action.payload.Footer;
        state.About = action.payload.About;
      })
      // Handle failed home page data fetching
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch home page data";
      });
  },
});

export default homePageSlice.reducer;
