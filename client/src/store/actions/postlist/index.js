export const GET_LIST = "GET_LIST";
export const GET_LIST_STACK = "GET_LIST_STACK";
export const RESET_LIST = "RESET_LIST";

export const getListAction = ({ data, count }) => {
  return {
    type: GET_LIST,
    payload: { data, count },
  };
};

export const getListStackAction = ({ data, count }) => {
  return {
    type: GET_LIST_STACK,
    payload: { data, count },
  };
};

export const resetListAction = () => {
  return {
    type: RESET_LIST,
  };
};
