import {
  ALARM_PAGENATION,
  NOTICE_ALARM,
  EVENT_ALARM,
  TARGET_NAME,
} from "../actions/socket";

const initialState = {
  alarmPage: { limit: 5, page_num: 1 },
  notice: false,
  event: false,
  targetId: ""
};

export default function socketReducer(state = initialState, action) {
  switch (action.type) {
    case ALARM_PAGENATION:
      return { ...state, alarmPage: action.payload };
    case NOTICE_ALARM:
      return { ...state, notice: action.payload };
    case EVENT_ALARM:
      return { ...state, event: action.payload };
    case TARGET_NAME:
      return { ...state, targetId: action.payload };
    default:
      return state;
  }
}
