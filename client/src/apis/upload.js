import api from "./";
/**
 * @param {formData} formData requried
 * @param {string} folder required
 */
export const uploadSingleImage = (formData, folder) => {
  return api.post(`/bucket/upload/single/${folder}`, formData);
};
/**
 * @param {formData} formData requried
 * @param {string} folder required
 */
export const uploadArrayImage = (formData, folder) => {
  return api.post(`/bucket/upload/array/${folder}`, formData);
};
/**
 * @param {Array} fileArr requried
 */
export const destroyImage = (fileArr) => {
  return api.post(`/bucket/destroy`, { files: fileArr });
};
