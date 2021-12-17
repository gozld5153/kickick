import { GET_LIST, GET_LIST_STACK, RESET_LIST } from "../actions/postlist";

import { dateConverter } from "../../commons/utils/dateConverter";

const initialState = {
  count: 0,
  data: [],
};

export default function postlistReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST:
      action.payload.data.forEach((el) => {
        el.created_at = dateConverter(el.created_at);
      });
      return { ...action.payload };
    case GET_LIST_STACK:
      action.payload.data.forEach((el) => {
        el.created_at = dateConverter(el.created_at);
      });
      return {
        ...state,
        data: state.data.concat(action.payload.data),
        count: action.payload.count,
      };
    case RESET_LIST:
      return initialState;
    default:
      return state;
  }
}
