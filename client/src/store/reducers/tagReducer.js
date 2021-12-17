import { ADD_TAG, DEL_TAG, RESET_TAG } from "../actions/postadd";

export default function tagReducer(state = [], action) {
  switch (action.type) {
    case ADD_TAG:
      let newArr = state.slice();

      let idx = newArr.findIndex((el) => el.label === action.payload.label);
      if (idx === -1) {
        newArr.push(action.payload);
      } else {
        newArr.splice(idx, 1, action.payload);
      }
      return newArr;

    case DEL_TAG:
      let arr = state.slice();
      arr.splice(action.idx, 1);
      return arr;
    case RESET_TAG:
      return [];
    default:
      return state;
  }
}
