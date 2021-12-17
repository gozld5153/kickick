import { THMEME_MODE } from "../actions/nav";
import { light } from "../../commons/styles/theme";

export default function themeReducer(state = [light, "light"], action) {
  switch (action.type) {
    case THMEME_MODE:
      return action.payload;
    default:
      return state;
  }
}