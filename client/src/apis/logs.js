import api from "./";
/**
 *  @param {string} type option
 *  @param {number} limit option
 *  @param {number} page_num option
 **/
export const getLogs = (type, limit, page_num) => {
  let query = "?";

  if (type) query += `type=${type}&`;
  if (limit) query += `limit=${limit}&`;
  if (page_num) query += `page_num=${page_num}&`;

  return api.get(`/logs/info${query.slice(0, -1)}`);
};
