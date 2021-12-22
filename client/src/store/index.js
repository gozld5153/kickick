import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import {
  kickboardReducer,
  postlistReducer,
  postAddReducer,
  postInfoReducer,
  loginReducer,
  themeReducer,
  mypageReducer,
  onoffReducer,
  tagReducer,
  socketReducer,
  alarmListReducer,
  postsearchReducer,
  commentsReducer,
  preThemeReducer,
} from "./reducers";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  postInfo: postInfoReducer,
  preThemeMode: preThemeReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: {
    persist: persistedReducer,
    kickboard: kickboardReducer,
    board: postlistReducer,
    postAdd: postAddReducer,
    onoff: onoffReducer,
    tag: tagReducer,
    login: loginReducer,
    themeMode: themeReducer,
    mypage: mypageReducer,
    socket: socketReducer,
    alarmList: alarmListReducer,
    postsearch: postsearchReducer,
    comments: commentsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
