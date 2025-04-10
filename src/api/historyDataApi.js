import axios from 'axios';

// Define the API URL for history data
const API_URL = 'http://localhost:5000/api/historyData';  // Adjust URL based on your server



// Get all history logs
export const getAllHistory = () => {
  return axios.get(API_URL);  // Fetch all history logs
};

export default {
  getAllHistory,
};
