import {
  SELECT_PAGE,
  SELECT_DIV_PAGE,
  RESET_PAGINATION,
  BOARD_ALIGN,
  TITLE_SEARCH,
  TAG_SEARCH,
  WRITER_SEARCH,
  RESET_SEARCH_REDUCER,
  REFRESH_SEARCH,
} from "../actions/postsearch";

const initialState = {
  align: "최신",
  tag: "",
  title: "",
  writer: "",
  selectPage: 1,
  limitPage: 10,
  refresh: false,
};

export default function postserachReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_PAGE:
      return { ...state, ...action.payload };
    case SELECT_DIV_PAGE:
      return { ...state, ...action.payload };
    case BOARD_ALIGN:
      return { ...state, ...action.payload };
    case RESET_PAGINATION:
      return { ...state, ...action.payload };
    case TITLE_SEARCH:
      return { ...state, ...action.payload };
    case TAG_SEARCH:
      return { ...state, ...action.payload };
    case WRITER_SEARCH:
      return { ...state, ...action.payload };
    case REFRESH_SEARCH:
      return { ...state, ...action.payload };
    case RESET_SEARCH_REDUCER:
      return { ...initialState, ...action.payload };
    default:
      return state;
  }
}
