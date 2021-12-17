import { IS_LOGIN, TODAY_LOGIN, IS_POINT } from "../actions/login";

const initialState = { isLogin: false, todayLogin: false, isPoint:false };

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case IS_LOGIN:
      return { ...state, isLogin: action.payload };
    case TODAY_LOGIN:
      return { ...state, todayLogin: action.payload };
    case IS_POINT:
      return { ...state, isPoint: action.payload };
    default:
      return state;
  }
}
