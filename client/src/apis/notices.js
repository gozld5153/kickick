import api from "./";
/**
 *  @param {number} notice_id required
 **/
export const getNoticesInfo = (notice_id) => {
  return api.get(`/notices/info?notice_id=${notice_id}`);
};
/**
 *  @param {string} notice_name option
 *  @param {string} type option
 *  @param {number} limit option
 *  @param {number} page_num option
 **/
export const getNoticesList = ({ notice_name, type, limit, page_num }) => {
  let query = "?";

  if (notice_name) query += `notice_name=${notice_name}&`;
  if (type) query += `type=${type}&`;
  if (limit) query += `limit=${limit}&`;
  if (page_num) query += `page_num=${page_num}&`;

  return api.get(`/notices/list${query.slice(0, -1)}`);
};
/**
 *  @param {string} type required
 *  @param {string} notice_name required
 *  @param {string} thumbnail option
 *  @param {string} summary required
 *  @param {string} content required
 **/
export const createNotices = ({
  type,
  notice_name,
  thumbnail,
  summary,
  content,
}) => {
  return api.post(`/notices/info`, {
    type,
    notice_name,
    thumbnail,
    summary,
    content,
  });
};
/**
 *  @param {number} notice_id required
 *  @param {string} type required
 *  @param {string} notice_name required
 *  @param {string} thumbnail option
 *  @param {string} summary required
 *  @param {string} content required
 **/
export const putNotices = ({
  notice_id,
  type,
  notice_name,
  thumbnail,
  summary,
  content,
}) => {
  return api.post(`/notices/info/${notice_id}`, {
    type,
    notice_name,
    thumbnail,
    summary,
    content,
  });
};
/**
 *  @param {number} notice_id required
 **/
export const delNotices = (notice_id) => {
  return api.delete(`/notices/info/${notice_id}`);
};
