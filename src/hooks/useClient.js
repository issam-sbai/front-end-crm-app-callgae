// hooks/useClient.js
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, addClient, removeClient, filterClientsByCriteria } from '../features/clientSlice';

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

  // Export clients data to CSV
  const exportToCSV = () => {
    const headers = [
      'Prenom', 'Entreprise', 'Contact', 'Adresse', 'Status', 'Email', 'Date RDV'
    ];

    // Map client data to rows
    const rows = clients.map(client => [
      client.prenom,
      client.entreprise,
      `${client.phone} / ${client.email}`,
      `${client.adresse} ${client.codepostal}`,
      client.statusChantier,
      client.email,
      new Date(client.dateRdv).toLocaleDateString('en-CA')  // Formatting the date as 'YYYY-MM-DD'
    ]);

    let csvContent = "data:text/csv;charset=utf-8,";

    // Add headers to CSV content
    csvContent += headers.join(",") + "\r\n";

    // Add each row to CSV content
    rows.forEach(row => {
      csvContent += row.join(",") + "\r\n";
    });

    // Create a downloadable link and trigger the download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "clients.csv");
    document.body.appendChild(link);
    link.click();
  };

  return {
    clients,
    status,
    error,
    getAllClients,
    createClient,
    deleteClient,
    getClientsByAgentId,
    filterClients,
    exportToCSV
  };
};

export default useClient;
