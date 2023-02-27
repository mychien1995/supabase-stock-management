import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../features/auth/userSlice";
import bannerReducer from "../components/layout/topBannerSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    banner : bannerReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
