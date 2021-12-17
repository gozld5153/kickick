import api from "./";
/**
 *  @param {string} email
 *  @param {string} password
 **/
export const getAlarm = (limit, page_num) =>
  api.get(`/alarms/info?limit=${limit}&page_num=${page_num}`);
/**
 *  @param {string} email
 *  @param {string} password
 **/
export const postAlarm = (alarm_id, is_checked) =>
  api.put(`/alarms/info/${alarm_id}`, { is_checked });
