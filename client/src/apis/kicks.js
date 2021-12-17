import api from "./";
/**
 *  @param {number} kick_id required
 **/
export const getKicksInfo = (kick_id) => {
  return api.get(`/kicks/info?kick_id=${kick_id}`);
};
/**
 *  @param {number} limit option
 *  @param {number} page_num option
 **/
export const getKicksList = (limit, page_num) => {
  let query = "?";

  if (limit) query += `limit=${limit}&`;
  if (page_num) query += `page_num=${page_num}&`;

  return api.get(`/kicks/list${query.slice(0, -1)}`);
};
/**
 *  @param {number} post_id required
 *  @param {string} thumbnail option
 *  @param {string} content required
 **/
export const createKicks = (post_id, thumbnail, content) => {
  return api.post(`/kicks/info`, { post_id, thumbnail, content });
};
/**
 *  @param {number} kick_id required
 *  @param {string} thumbnail option
 *  @param {string} content required
 **/
export const putKicks = (kick_id, thumbnail, content) => {
  return api.put(`/kicks/info/${kick_id}`, { thumbnail, content });
};
/**
 *  @param {number} kick_id required
 **/
export const delKicks = (kick_id) => {
  return api.delete(`/kicks/info/${kick_id}`);
};
/**
 *  @param {number} kick_id required
 **/
export const purchaseKicks = (kick_id) => {
  return api.post(`/kicks/purchase`, { kick_id });
};
