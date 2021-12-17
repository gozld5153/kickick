import { ALARM_LIST } from "../actions/nav";

export default function alarmListReducer(
  state = { count: 0, data: [] },
  action
) {
  switch (action.type) {
    case ALARM_LIST:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
