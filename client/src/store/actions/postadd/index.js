export const GET_CATEGORY = "GET_CATEGORY";
export const GET_POST_NAME = "GET_POST_NAME";
export const GET_CONTENT = "GET_CONTENT";
export const GET_THUMBNAIL = "GET_THUMBNAIL";
export const GET_MAIN_CONTENT = "GET_MAIN_CONTENT";
export const CHANGE_WRITE_MODE = "CHANGE_WRITE_MODE";
export const RESET_POSTADD = "RESET_POSTADD";
export const GO_BACK = "GO_BACK";
export const ADD_TAG = "ADD_TAG";
export const DEL_TAG = "DEL_TAG";
export const RESET_TAG = "RESET_TAG";

export const getCategoryAction = (category, type) => {
  if (type) category += "_킥";
  else category += "_자유";
  return {
    type: GET_CATEGORY,
    payload: { category },
  };
};
export const getPostNameAction = (post_name) => {
  return {
    type: GET_POST_NAME,
    payload: { post_name },
  };
};
export const getThumbnailAction = (thumbnail) => {
  return {
    type: GET_THUMBNAIL,
    payload: { thumbnail },
  };
};
export const getContentAction = (content) => {
  return {
    type: GET_CONTENT,
    payload: { content },
  };
};
export const getMainContentAction = (main_content) => {
  return {
    type: GET_MAIN_CONTENT,
    payload: { main_content },
  };
};
export const changeWriteModeAction = (mode) => {
  return {
    type: CHANGE_WRITE_MODE,
    payload: { mode },
  };
};

export const resetPostAddAction = () => {
  return {
    type: RESET_POSTADD,
  };
};

export const goBack = (trigger) => {
  return {
    type: GO_BACK,
    payload: trigger,
  };
};

export const addTagAction = (label, word) => {
  return {
    type: ADD_TAG,
    payload: { label, word },
  };
};

export const delTagAction = (idx) => {
  return {
    type: DEL_TAG,
    idx,
  };
};

export const resetTag = () => {
  return {
    type: RESET_TAG,
  };
};
