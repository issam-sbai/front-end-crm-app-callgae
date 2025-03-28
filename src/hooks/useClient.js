// hooks/useClient.js
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, addClient, removeClient,filterClientsByCriteria  } from '../features/clientSlice';

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

  const filterClients = (filterData) => {
    dispatch(filterClientsByCriteria(filterData));
  };

  return {
    clients,
    status,
    error,
    getAllClients,
    createClient,
    deleteClient,
    getClientsByAgentId,
    filterClients
  };
};

export default useClient;
