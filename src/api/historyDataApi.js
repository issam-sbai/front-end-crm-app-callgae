import axiosInstance from "./axiosInstance.JS";


// Get all history logs
export const getAllHistory = () => {
  return axiosInstance.get('historyData');  // No need for full URL anymore
};

export default {
  getAllHistory,
};