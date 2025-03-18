// hooks/useClient.js
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, addClient, removeClient } from '../features/clientSlice';

const useClient = () => {
  const dispatch = useDispatch();
  
  const clients = useSelector((state) => state.clients?.clientsx || []);
  const status = useSelector((state) => state.clients?.status || 'idle');
  const error = useSelector((state) => state.clients?.error || null);

  const getAllClients = () => {
    dispatch(fetchClients());
  };

  const createClient = (clientData) => {
    dispatch(addClient(clientData));
  };

  const deleteClient = (id) => {
    dispatch(removeClient(id));
  };

  const getClientsByAgentId = (agentId) => {
    dispatch(fetchClientsByAgentId(agentId));
  };

  return {
    clients,
    status,
    error,
    getAllClients,
    createClient,
    deleteClient,
    getClientsByAgentId
  };
};

export default useClient;
