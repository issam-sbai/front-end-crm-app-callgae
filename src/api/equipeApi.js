import axios from 'axios';

// Define the API URL
const API_URL = 'http://localhost:5000/api/equipes';

// Create a new Equipe
export const createEquipe = (equipeData) => {
  return axios.post(API_URL, equipeData,{
    withCredentials: true, // Include cookies (if any)
  });
};

// Get all Equipes
export const getAllEquipes = () => {
  return axios.get(API_URL,{
    withCredentials: true, // Include cookies (if any)
  });
};

// Get Equipe by ID
export const getEquipeById = (id) => {
  return axios.get(`${API_URL}/${id}`,{
    withCredentials: true, // Include cookies (if any)
  });
};

// Update an Equipe by ID
export const updateEquipe = (id, equipeData) => {
  return axios.put(`${API_URL}/${id}`, equipeData,{
    withCredentials: true, // Include cookies (if any)
  });
};

// Delete an Equipe by ID
export const deleteEquipe = (id) => {
  console.log("apî",id);
  
  return axios.delete(`${API_URL}/${id}`,{
    withCredentials: true, // Include cookies (if any)
  });
};

// Get clients associated with a specific Equipe
export const getClientsByEquipe = (equipeId) => {
  return axios.get(`${API_URL}/${equipeId}/clients`,{
    withCredentials: true, // Include cookies (if any)
  });
};
