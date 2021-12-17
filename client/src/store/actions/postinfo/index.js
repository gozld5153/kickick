export const GET_POST_INFO = "GET_POST_INFO";
export const GET_MAIN_INFO = "GET_MAIN_INFO";

export const getPostInfoAction = (data) => {
  return {
    type: GET_POST_INFO,
    payload: data,
  };
};
export const getMainInfoAction = (data) => {
  return {
    type: GET_MAIN_INFO,
    payload: { main_content: data },
  };
};
