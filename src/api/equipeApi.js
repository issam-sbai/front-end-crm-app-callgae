import axiosInstance from "./axiosInstance.JS";

// Create a new Equipe
export const createEquipe = (equipeData) => {
  return axiosInstance.post('equipes', equipeData);
};

// Get all Equipes
export const getAllEquipes = () => {
  return axiosInstance.get('equipes');
};

// Get Equipe by ID
export const getEquipeById = (id) => {
  return axiosInstance.get(`equipes/${id}`);
};

// Update an Equipe by ID
export const updateEquipe = (id, equipeData) => {
  return axiosInstance.put(`equipes/${id}`, equipeData);
};

// Delete an Equipe by ID
export const deleteEquipe = (id) => {
  console.log("api", id);
  return axiosInstance.delete(`equipes/${id}`);
};

// Get clients associated with a specific Equipe
export const getClientsByEquipe = (equipeId) => {
  return axiosInstance.get(`equipes/${equipeId}/clients`);
};
