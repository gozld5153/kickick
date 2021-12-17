import { GET_POST_INFO, GET_MAIN_INFO } from "../actions/postinfo";

import { dateConverter } from "../../commons/utils/dateConverter";

const initialState = {
  category: "",
  content: "",
  cost: null,
  created_at: "",
  favorite: "",
  favorite_count: 0,
  is_liked: null,
  kick: { kick_id: null, thumbnail: null },
  like_count: 0,
  likes: { true: 0, false: 0 },
  main_content: "",
  post_id: null,
  post_name: "",
  tags: [],
  user: { username: "", profile: null },
  view_count: null,
};

export default function postInfoReducer(state = {}, action) {
  switch (action.type) {
    case GET_POST_INFO:
      action.payload.created_at = dateConverter(action.payload.created_at);
      const payload = state.main_content
        ? { ...state, ...action.payload }
        : { ...action.payload };
      return payload;
    case GET_MAIN_INFO:
      return { ...initialState, ...action.payload };
    default:
      return state;
  }
}
