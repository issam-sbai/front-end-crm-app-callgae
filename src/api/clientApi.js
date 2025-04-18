// api/clientApi.js
import axios from 'axios';

// const API_URL = 'http:/.localhost:5000/api/clients';



const API_URL = 'http://localhost:5000/api/clients';




export const createClient = (clientData) => {
  return axios.post(API_URL, clientData);
};

export const getClientsByEquipe = (equipeId) => {
  return axios.get(`http://localhost:5000/api/clients/equipe/${equipeId}/clients`);
};

export const getClients = () => {
  return axios.get(API_URL);
};

export const getClientById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const updateClient = (id, clientData) => {
  return axios.put(`${API_URL}/${id}`, clientData);
};

export const deleteClient = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const getClientsByAgentId = (agentId) => {
  return axios.get(`${API_URL}/agent/${agentId}`);
};

export const filterClients = (filterData) => {
  return axios.post(`${API_URL}/filter`, filterData);
};

export const updateClientNRPApi = (id, { nrp, updatePar }) => {
  return axios.patch(`${API_URL}/${id}/nrp`, { nrp, updatePar });
};

export const addObservation = (id, newObservation) => {
  return axios.put(`${API_URL}/${id}/observations`, { newObservation });
};
