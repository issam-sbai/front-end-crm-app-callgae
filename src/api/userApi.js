import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // Change this to your backend URL

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData,{
      withCredentials: true, // Include cookies (if any)
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials,{
      withCredentials: true, // Include cookies (if any)
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get the current user (me)
export const getUserById = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`,{
      withCredentials: true, // Include cookies (if any)
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL,{
      withCredentials: true, // Include cookies (if any)
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update user by ID
export const updateUser = async (id, updatedUser) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedUser,{
      withCredentials: true, // Include cookies (if any)
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete user by ID
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`,{
      withCredentials: true, // Include cookies (if any)
    });
    return id;
  } catch (error) {
    throw error;
  }
};
