import {
  GET_COMMENTS,
  REFRESH_COMMENTS,
  RESET_COMMENTS,
} from "../actions/comments";

const initialState = {
  count: 0,
  data: [],
  refresh: false,
};

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return { ...action.payload };
    case REFRESH_COMMENTS:
      return { ...state, ...action.payload };
    case RESET_COMMENTS:
      return initialState;
    default:
      return state;
  }
}
