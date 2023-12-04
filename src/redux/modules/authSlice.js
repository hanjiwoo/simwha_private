import { createSlice } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { json } from "react-router-dom";

let initialState = {
  nickname: null,
  accessToken: null,
  userId: null,
  success: null,
  avatar: null,
  isLoggedIn: false,
};

const loginedUser = JSON.parse(localStorage.getItem("loginUser"));
if (loginedUser) {
  initialState = loginedUser;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.nickname = action.nickname;
      state.accessToken = action.accessToken;
      state.userId = action.userId;
      state.success = action.success;
      state.avatar = action.avatar;
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      state.nickname = action.nickname;
      state.accessToken = action.accessToken;
      state.userId = action.userId;
      state.success = action.success;
      state.avatar = action.avatar;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;
