import api from "../apis";

/**
 * @param {number} post_id
 * @param {boolean} agreement
 *
 */

export const getLikes = (post_id, agreement) => {
  let query = "?";

  if (post_id) query += `post_id=${post_id}&`;
  if (agreement) query += `agreement=${agreement}&`;

  return api.get(`/likes/info${query.slice(0, -1)}`);
};

/**
 * @param {number} post_id required
 * @param {boolean} agreement required
 */

export const createLikes = (post_id, agreement) => {
  return api.post(`/likes/info`, { post_id, agreement });
};

/**
 * @param {number} post_id required
 */
export const delLikes = (post_id) => {
  return api.delete(`likes/info/${post_id}`);
};
