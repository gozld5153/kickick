export const ALARM_PAGENATION = "ALARM_PAGENATION";
export const NOTICE_ALARM = "NOTICE_ALARM";
export const EVENT_ALARM = "EVENT_ALARM";
export const TARGET_NAME = "TARGET_NAME";

export const alarmPageAction = (page_num,limit) => {
  return {
    type: ALARM_PAGENATION,
    payload: { page_num,limit },
  };
};

export const noticeSocketAction = (boolean) => {
  return {
    type: NOTICE_ALARM,
    payload: boolean,
  };
};

export const eventSocketAction = (boolean) => {
  return {
    type: EVENT_ALARM,
    payload: boolean,
  };
};

export const targetNameAction = (targetName) => {
  return {
    type: TARGET_NAME,
    payload: targetName,
  };
};