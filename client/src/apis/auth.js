import api from "./";
/**
 *  @param {object} data
 **/
export const duplicationCheck = (data) => api.post(`/auth/duplication-check`, data);
  /**
 *  @param {boolean} todayLogin
 **/
export const nowImLogin = (todayLogin) =>
  api.get(`/users/info?todayLogin=${todayLogin}`);
/**
 *  @param {string} username
 *  @param {string} password
 **/
export const signIn = (username, password) =>
  api.post(`/auth/signin`, { username, password });
    /**
 *  @param {string} code
 **/
export const kakaoSignIn = (code) =>
  api.post(`/auth/kakao`, { code });
/**
 *  @param {string} access_tokencode
 **/
export const googleSignIn = (access_token) =>
  api.post(`/auth/google`, { access_token });
  /**
 *  @param {string} code
 *  @param {string} state
 **/
export const naverSignIn = (code, state) =>
  api.post(`/auth/naver`, { code, state });
  /**
 *  @param {string} username
 **/
export const tempoSignIn = (username) =>
  api.post(`/auth/signin`, { username, type: "guest" });
  /**
 *  @param {string} username
 **/
export const mailCheck = (username) =>
  api.post(`/auth/email`, { username });
  /**
*  @param {object} data
**/
export const signUp = ( data ) =>
  api.post(`/users/info`, data);
  /**
*  @param {object} data
**/
export const tempoSignUp = ( data ) =>
  api.put(`/users/info`, data);
/**
 *
 **/
export const signOut = () => api.post(`/auth/signout`);
