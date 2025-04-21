import axiosInstance from "./axiosInstance.JS";


export const createClient = (clientData) => {
  return axiosInstance.post('clients', clientData);
};

export const getClientsByEquipe = (equipeId) => {
  return axiosInstance.get(`clients/equipe/${equipeId}/clients`);
};

export const getClients = () => {
  return axiosInstance.get('clients');
};

export const getClientById = (id) => {
  return axiosInstance.get(`clients/${id}`);
};

export const updateClient = (id, clientData) => {
  return axiosInstance.put(`clients/${id}`, clientData);
};

export const deleteClient = (id) => {
  return axiosInstance.delete(`clients/${id}`);
};

export const getClientsByAgentId = (agentId) => {
  return axiosInstance.get(`clients/agent/${agentId}`);
};

export const filterClients = (filterData) => {
  return axiosInstance.post('clients/filter', filterData);
};

export const updateClientNRPApi = (id, { nrp, updatePar }) => {
  return axiosInstance.patch(`clients/${id}/nrp`, { nrp, updatePar });
};

export const addObservation = (id, newObservation) => {
  return axiosInstance.put(`clients/${id}/observations`, { newObservation });
};
