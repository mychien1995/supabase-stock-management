import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface BannerInfo {
  title: string;
  subTitle: string;
}

const initialState: BannerInfo = {
  title: "",
  subTitle: "",
};

export const topBannerSlice = createSlice({
  name: "topBanner",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<BannerInfo>) => {
      state.title = action.payload.title;
      state.subTitle = action.payload.subTitle;
    },
  },
});

export const { setTitle: setBannerTitle } = topBannerSlice.actions;

export const getBannerInfo = (state: RootState) => state.banner;

export default topBannerSlice.reducer;
