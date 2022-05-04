import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

import {
  AuthProps,
  EditProductPriceProps,
  PaymentProps,
  ProductInCommentProps,
  WriteCommentProps,
} from "../../utils/type/redux/reduxType";
import JwtManager from "../../utils/other/JwtManager";

const initialState: AuthProps = {
  isLoading: true,
  isAuthenticated: false,
  userAvatar: "",
  type: "",
  isHidden: false,
};

export const checkAuthRedux = createAsyncThunk("checkAuth", async () => {

  const token = JwtManager.getToken();
  if (token) {
    return {
      success: true,
      type: "have token",
      avatar: "",
    };
  } else {
    const data = (await JwtManager.getRefreshToken()) as {
      success: boolean;
      avatar: string;
      type: string;
      isHidden: boolean;
    };

    return data;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutClient(state) {
      JwtManager.deleteInMemoryToken();
      state.isAuthenticated = false;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setIsHidden(state, action: PayloadAction<boolean>) {
      state.isHidden = action.payload;
    },
    setUserAvatar(state, action: PayloadAction<string>) {
      state.userAvatar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthRedux.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthRedux.fulfilled, (state, action) => {
        const { success, type, avatar, isHidden } = action.payload as {
          success: boolean;
          avatar: string;
          type: string;
          isHidden: boolean;
        };
        if (type !== "have token" && type !== "") {
          state.userAvatar = avatar;
          state.type = type;
        }
        state.isAuthenticated = success;
        state.isHidden = isHidden;
        state.isLoading = false;
      });
  },
});

const authReducer = authSlice.reducer;
export const authSelector = (state: RootState) => state.auth;
export const {
  logoutClient,

  setIsAuthenticated,
  setLoading,
  setUserAvatar,

  setIsHidden,
} = authSlice.actions;
export default authReducer;
