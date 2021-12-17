export const GET_COMMENTS = "GET_COMMENTS";
export const REFRESH_COMMENTS = "REFRESH_COMMENTS";
export const RESET_COMMENTS = "RESET_COMMENTS";

export const getCommentsAction = ({ data, count }) => {
  return { type: GET_COMMENTS, payload: { data, count } };
};

export const refreshCommentsAction = () => {
  return { type: REFRESH_COMMENTS, payload: { refresh: Math.random() } };
};

export const resetCommentsAction = () => {
  return { type: RESET_COMMENTS };
};
