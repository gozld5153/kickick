import api from "./";
/**
 *  @param {boolean} is_visited
 **/
export const firstEnter = (is_visited) => api.post(`/cookies/info`, { is_visited });
/**
 *  
 **/
export const firstEnterCheck = () => api.get(`/cookies/info`);