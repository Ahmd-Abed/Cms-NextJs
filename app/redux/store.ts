// import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
// import { createWrapper, HYDRATE } from "next-redux-wrapper";
// import { homePageModel } from "../models/homePageModel";
// import homePageSlice from "./homePageSlice";

// const store = configureStore({
//   reducer: {
//     homePage: homePageSlice,
//   },
// });

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;

// const makeStore = () => store;

// export const wrapper = createWrapper(makeStore);

import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { Action } from "redux";
import homePageSlice from "./homePageSlice";
import navbarSlice from "./navBarSlice";
const makeStore = () =>
  configureStore({
    reducer: {
      homePage: homePageSlice,
      navbar: navbarSlice,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore);
