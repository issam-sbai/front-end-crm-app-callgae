// api/clientApi.js
import axios from 'axios';

// const API_URL = 'http:/.localhost:5000/api/clients';



const API_URL = 'http://localhost:5000/api/clients';




export const createClient = (clientData) => {
  return axios.post(API_URL, clientData,{
    withCredentials: true, // Include cookies (if any)
  });
};

export const getClientsByEquipe = (equipeId) => {
  return axios.get(`http://localhost:5000/api/clients/equipe/${equipeId}/clients`,{
    withCredentials: true, // Include cookies (if any)
  });
};

export const getClients = () => {
  return axios.get(API_URL ,{
    withCredentials: true, // Include cookies (if any)
  });
};

export const getClientById = (id) => {
  return axios.get(`${API_URL}/${id}`,{
    withCredentials: true, // Include cookies (if any)
  });
};

export const updateClient = (id, clientData) => {
  return axios.put(`${API_URL}/${id}`, clientData,{
    withCredentials: true, // Include cookies (if any)
  });
};

export const deleteClient = (id) => {
  return axios.delete(`${API_URL}/${id}`,{
    withCredentials: true, // Include cookies (if any)
  });
};

export const getClientsByAgentId = (agentId) => {
  return axios.get(`${API_URL}/agent/${agentId}`,{
    withCredentials: true, // Include cookies (if any)
  });
};

export const filterClients = (filterData) => {
  return axios.post(`${API_URL}/filter`, filterData,{
    withCredentials: true, // Include cookies (if any)
  });
};

export const updateClientNRPApi = (id, { nrp, updatePar }) => {
  return axios.patch(`${API_URL}/${id}/nrp`, { nrp, updatePar },{
    withCredentials: true, // Include cookies (if any)
  });
};

export const addObservation = (id, newObservation) => {
  return axios.put(`${API_URL}/${id}/observations`, { newObservation },{
    withCredentials: true, // Include cookies (if any)
  });
};
