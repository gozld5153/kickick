import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

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
    preThemeMode: preThemeReducer,
    mypage: mypageReducer,
    socket: socketReducer,
    alarmList: alarmListReducer,
    postsearch: postsearchReducer,
    comments: commentsReducer,
  },

  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({ serializableCheck: false }),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
