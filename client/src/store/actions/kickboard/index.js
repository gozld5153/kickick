export const GET_KICKS_INFO = "GET_KICKS_INFO";
export const GET_KICKS_LIST = "GET_KICKS_LIST";
export const MODAL_ON = "MODAL_ON";
export const MODAL_OFF = "MODAL_OFF";

// 마이페이지로 이동 예정
export const getKicksListAction = () => {
  return {
    type: MODAL_ON,
    payload: { modal: true },
  };
};

export const getKicksInfoAction = () => {
  return {
    type: MODAL_ON,
    payload: { modal: true },
  };
};

export const modalOnAction = (data) => {
  return {
    type: MODAL_ON,
    payload: { modalState: true, modalInfo: data },
  };
};

export const modalOffAction = () => {
  return {
    type: MODAL_OFF,
    payload: { modalState: false, modalInfo: {} },
  };
};
