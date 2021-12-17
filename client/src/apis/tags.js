import api from "./";
/**
 *  @param {number} post_id required
 **/
export const getTags = (post_id) => {
  return api.get(`/tags/info?post_id=${post_id}`);
};
/**
 *  @param {number} post_id required
 *  @param {string} content required
 **/
export const createTags = (post_id, tags) => {
  return api.post(`/tags/info`, { post_id, tags });
};
/**
 *  @param {number} post_id required
 *  @param {number} tag_id required
 **/
export const delTags = (post_id, tag_id) => {
  return api.delete(`/tags/info/${post_id}/${tag_id}`);
};
