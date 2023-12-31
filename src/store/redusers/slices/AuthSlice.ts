import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { IauthUser } from "../../../models/IauthTipes";
import {
  register,
  logout,
  fecthCurrentUser,
  login,
} from "../actioncreators/AuthActionCreator";
import { registerDataType } from "../../../models/credentialTipes";

export interface AuthState {
  user: IauthUser;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}
const initialState: AuthState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [register.fulfilled.type]: (
      state,
      action: PayloadAction<registerDataType>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [login.fulfilled.type]: (
      state,
      action: PayloadAction<registerDataType>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [logout.fulfilled.type]: (state) => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [fecthCurrentUser.pending.type]: (state) => {
      state.isRefreshing = true;
    },
    [fecthCurrentUser.fulfilled.type]: (
      state,
      action: PayloadAction<IauthUser>
    ) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    },
    [fecthCurrentUser.rejected.type](state) {
      state.isRefreshing = false;
    },
  },
});
const authtPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};
export const authSliceConfigReducer = persistReducer(
  authtPersistConfig,
  authSlice.reducer
);
