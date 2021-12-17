import {
  GET_FAVORITES,
  GET_MY_POST,
  GET_MY_COMMENT,
  GET_PURCHASED_KICK,
  GET_KICKMONEY_LOG,
} from "../actions/mypage";

import { logDateConverter } from "../../commons/utils/dateConverter";

const initialState = {
  favorites: { count: 0, data: [] },
  mypost: { count: 0, data: [] },
  mycomment: { count: 0, data: [] },
  kick: { count: 0, data: [] },
  log: { count: 0, data: [] },
};

export default function mypageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FAVORITES:
      return { ...state, ...action.payload };
    case GET_MY_POST:
      action.payload.mypost.data.forEach((el) => {
        el.created_at = logDateConverter(el.created_at);
      });
      return { ...state, ...action.payload };
    case GET_MY_COMMENT:
      action.payload.mycomment.data.forEach((el) => {
        el.created_at = logDateConverter(el.created_at);
      });
      return { ...state, ...action.payload };
    case GET_PURCHASED_KICK:
      return { ...state, ...action.payload };
    case GET_KICKMONEY_LOG:
      action.payload.log.data.forEach((el) => {
        el.created_at = logDateConverter(el.created_at);
      });
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
