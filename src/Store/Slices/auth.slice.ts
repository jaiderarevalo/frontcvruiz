import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../actions/auth.actions";
import { handlePending } from "../actions/base.actions";

export interface UserLogin {
  email: string;
  password: string;
}
export interface UserEmail {
  email: string;
}

export interface UserRegister {
  email: string;
  name: string;
  password: string;
  gender: string;
  confirmpassword: string;
}
export interface RegisterState {
  user: UserLogin | null;
  loading: boolean;
  error: string | null;
  isLogin: boolean;
  isRegister: boolean;
  token: string | null;
  alreadyEmail: boolean;
}
const initialState: RegisterState = {
  user: null,
  loading: false,
  error: null,
  isRegister: false,
  isLogin: false,
  token: null,
  alreadyEmail: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, { payload }: any) => {
      state.loading = false;
      state.user = payload.user;
      state.token = payload.accessToken;
      state.isLogin = true;
    },
    setLogout: (state) => {
      state.user = null;
      state.isLogin = false;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, { payload }: any) => {
        state.loading = false;
        state.user = payload.user;
        state.isRegister = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
      })
    //   .addCase(loginUser.pending, handlePending)
    //   .addCase(loginUser.fulfilled, (state, { payload }: any) => {
    //     state.loading = false;
    //     state.user = payload.user;
    //     state.token = payload.accessToken;
    //     state.isLogin = true;
    //     AsyncStorage.setItem("token", payload.accessToken);
    //   })
    //   .addCase(loginUser.rejected, (state) => {
    //     state.loading = false;
    //     state.isLogin = false;
    //     state.alreadyEmail = false;
    //   })
    //   .addCase(validateEmail.pending, handlePending)
    //   .addCase(validateEmail.fulfilled, (state) => {
    //     state.loading = false;
    //     state.token = null;
    //     state.alreadyEmail = true;
    //   })
    //   .addCase(validateEmail.rejected, (state) => {
    //     state.loading = false;
    //     state.alreadyEmail = false;
    //   })
    //   .addCase(validateToken.pending, handlePending)
    //   .addCase(validateToken.fulfilled, (state, { payload }: any) => {
    //     state.loading = false;
    //     state.token = payload.accessToken;
    //     state.alreadyEmail = true;
    //   })
    //   .addCase(validateToken.rejected, (state) => {
    //     state.loading = false;
    //     state.isLogin = false;
    //     state.alreadyEmail = false;
    //   })
    //   .addCase(updateUser.pending, handlePending)
    //   .addCase(updateUser.fulfilled, (state, { payload }: any) => {
    //     state.updateOneUser = payload;
    //   })

    //   .addCase(updateUser.rejected, (state, { payload }) => {
    //     state.loading = false;
    //   });
  },
});
export default authSlice.reducer;
export const { setLogout, setLogin } = authSlice.actions;
