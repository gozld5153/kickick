import api from "./";
/**
 *  @param {number} post_id
 *  @param {number} limit
 *  @param {number} page_num
 **/
export const getComments = (post_id, limit, page_num) => {
  let query = "?";

  if (post_id) query += `post_id=${post_id}&`;
  if (limit) query += `limit=${limit}&`;
  if (page_num) query += `page_num=${page_num}&`;

  return api.get(`/comments/info${query.slice(0, -1)}`);
};
/**
 *  @param {number} post_id
 *  @param {string} content
 **/
export const createComments = (post_id, content) =>
  api.post(`/comments/info`, { post_id, content });
/**
 *  @param {number} comment_id
 *  @param {string} content
 **/
export const putComments = (comment_id, content) => {
  return api.put(`/comments/info/${comment_id}`, { content });
};
/**
 *  @param {number} comment_id
 **/
export const delComments = (comment_id) => {
  return api.delete(`/comments/info/${comment_id}`);
};
