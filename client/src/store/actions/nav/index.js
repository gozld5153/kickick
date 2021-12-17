export const THMEME_MODE = "THMEME_MODE";
export const PRETHMEME_MODE = "PRETHMEME_MODE";
export const ALARM_LIST = "ALARM_LIST";

export const themeModeAction = (mode) => {
  return {
    type: THMEME_MODE,
    payload: mode,
  };
};

export const preThemeModeAction = (mode) => {
  return {
    type: PRETHMEME_MODE,
    payload: mode,
  };
};

export const alarmListAction = (arr) => {
  return {
    type: ALARM_LIST,
    payload: arr,
  };
};