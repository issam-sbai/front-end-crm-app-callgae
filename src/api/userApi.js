import axios from 'axios';
import axiosInstance from './axiosInstance.JS';
// Import your axiosInstance

const API_URL = 'https://my-express-mongo-app.onrender.com/api/users'; // Keep the base URL

// Register user (no change here)
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Login user (no change here)
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials); // Login doesn't need the token
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get the current user (me) — will now use axiosInstance with token
export const getUserById = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/me`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all users (uses axiosInstance)
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update user by ID (uses axiosInstance)
export const updateUser = async (id, updatedUser) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, updatedUser);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete user by ID (uses axiosInstance)
export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    throw error;
  }
};
