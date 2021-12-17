import api from "./";
/**
 *  @param {number} post_id required
 **/
export const getPostsInfo = (post_id) =>
  api.get(`/posts/info?post_id=${post_id}`);
/**
 *  @param {string} category option (이거 require아님?)
 *  @param {string} post_name option
 *  @param {string} username option
 *  @param {string} tag option
 *  @param {string} content option
 *  @param {number} favorite_count option
 * @param {number} like_count option
 *  @param {number} limit option
 *  @param {number} page_num option
 **/
export const getPostsList = ({
  category,
  post_name,
  username,
  tag,
  content,
  favorite_count,
  like_count,
  limit,
  page_num,
}) => {
  let query = "?";

  if (category) query += `category=${category}&`;
  if (post_name) query += `post_name=${post_name}&`;
  if (username) query += `username=${username}&`;
  if (tag) query += `tag=${tag}&`;
  if (content) query += `content=${content}&`;
  if (favorite_count) query += `favorite_count=${favorite_count}&`;
  if (like_count) query += `like_count=${like_count}&`;
  if (limit) query += `limit=${limit}&`;
  if (page_num) query += `page_num=${page_num}&`;

  return api.get(`/posts/list${query.slice(0, -1)}`);
};
/**
 * @param {string} category required
 * @param {string} post_name required
 * @param {string} content required
 * @param {number} cost option
 **/
export const createPost = (category, post_name, content, cost) => {
  const post = { category, post_name, content, cost };
  return api.post(`/posts/info`, post);
};

/**
 * @param {number} post_id required
 * @param {string} content required
 **/
export const createTag = (post_id, item) => {
  return api.post("/tags/info", { post_id, tags: item });
};
/**
 * @param {string} category required
 * @param {string} post_name required
 * @param {string} content required
 * @param {number} cost option
 * @param {number} post_id required
 **/
export const putPost = (category, post_name, content, cost, post_id) => {
  const data = { category, post_name, content, cost };
  return api.put(`/posts/info/${post_id}`, data);
};
/**
 * @param {number} post_id required
 **/
export const delPost = (post_id) => {
  return api.delete(`/posts/info/${post_id}`);
};
/**
 *
 **/
export const recommendedPost = () => {
  return api.get("/posts/recommended");
};
/**
 *
 **/
export const getClassifiedPost = () => {
  return api.get("/posts/classification");
};
