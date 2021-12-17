import { GO_BACK } from "../actions/postadd";

export default function onoffReducer(state = false, action) {
  switch (action.type) {
    case GO_BACK:
      return action.payload;
    default:
      return state;
  }
}
