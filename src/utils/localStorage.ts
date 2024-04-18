"use client";
const ACCESS_TOKEN: string = "accessToken";
const REFRESH_TOKEN: string = "refreshToken";
const USER_ACCOUNT: string = "userAccount";

const setKey = (key: string, value: string) => {
  localStorage.setItem(key, value);
};
const getKey = (key: string): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key);
};
const removeKey = (key: string) => {
  localStorage.removeItem(key);
};
const clear = () => {
  localStorage.clear();
};

const setAccessToken = (token: string) => {
  setKey(ACCESS_TOKEN, token);
};
const getAccessToken = () => {
  return getKey(ACCESS_TOKEN);
};
const removeAccessToken = () => {
  removeKey(ACCESS_TOKEN);
};

const setRefreshToken = (token: string) => {
  setKey(REFRESH_TOKEN, token);
};
const getRefreshToken = () => {
  return getKey(REFRESH_TOKEN);
};
const removeRefreshToken = () => {
  removeKey(REFRESH_TOKEN);
};

const setUserAccount = (user: any) => {
  setKey(USER_ACCOUNT, JSON.stringify(user));
};
const getUserAccount = () => {
  const account = getKey(USER_ACCOUNT);
  if (!account) {
    return null;
  }
  return JSON.parse(account);
};

const removeUserAccount = () => {
  removeKey(USER_ACCOUNT);
};

const logOut = () => {
  clear();
};

export {
  setKey,
  getKey,
  removeKey,
  clear,
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken,
  setUserAccount,
  getUserAccount,
  removeUserAccount,
  logOut,
};
