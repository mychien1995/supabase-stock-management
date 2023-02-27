import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface CurrentUserInfo {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

const initialState: CurrentUserInfo = {
  email: "",
  isLoggedIn: false,
  name: "",
};

export const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setLoggedInUser: (state, action: PayloadAction<CurrentUserInfo>) => {
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const isAuthenticated = (state : RootState) => state.user.isLoggedIn;

export default userSlice.reducer;