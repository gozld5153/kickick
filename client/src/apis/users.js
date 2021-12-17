import { AiOutlineConsoleSql } from "react-icons/ai";
import api from "./";
/**
 * Query가 있으면 Query로 검색(email / username 둘 중 하나만)
 * 없으면 단일 유저 정보
 * today_login은 true / false 로 보내야함
 * @param {string} username option
 * @param {string} email option
 * @param {boolean} today_login option
 * @param {number} limit option
 * @param {number}  page_num option
 */

export const getUserInfo = (username, email, today_login, limit, page_num) => {
  let query = "?";
  if (username) query += `username=${username}&`;
  if (email) query += `email=${email}&`;
  if (today_login) query += `today_login=${today_login}&`;
  if (limit) query += `limit=${limit}&`;
  if (page_num) query += `page_num=${page_num}&`;

  return api.get(`/users/info${query.slice(0, -1)}`);
};
/**
 * @param {object} data required
 */
export const putUserInfo = ({ username, email, password, profile }) => {
  const data = {};
  if (username !== "") data.username = username;
  if (email !== "") data.email = email;
  if (password !== "") data.password = password;
  if (profile) data.profile = profile;

  return api.put(`users/info`, data);
};
/**
 *
 */
export const delUserInfo = () => {
  return api.delete(`users/info`);
};
