import { PRETHMEME_MODE } from "../actions/nav";

export default function preThemeReducer(state = "light", action) {
  switch (action.type) {
    case PRETHMEME_MODE:
      return action.payload;
    default:
      return state;
  }
}
