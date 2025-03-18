import React, { useEffect } from 'react';
import useClient from '../../hooks/useClient';

const ClientsList = () => {
  const { clients, status, error, getAllClients, deleteClient } = useClient();

  useEffect(() => {
    getAllClients(); // Fetch clients on component mount
  }, [getAllClients]);


  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Clients List</h2>
      <ul>
        {clients.map((client) => (
          <li key={client._id}>
            <p><strong>Name:</strong> {client.nomPrenom}</p>
            <p><strong>Company:</strong> {client.entreprise}</p>
            <button onClick={() => deleteClient(client._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsList;
