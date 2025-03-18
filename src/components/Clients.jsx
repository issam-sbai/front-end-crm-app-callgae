import React, { useState } from 'react';
import TableComponent from './TableComponent';

const ClientsPage = () => {
  const [clientsData, setClientsData] = useState([
    {
      nomPrenom: 'John Doe',
      entreprise: 'XYZ Corp.',
      telephone: '123-456-7890',
      adresse: '123 Main St.',
      email: 'john.doe@example.com',
      agentId: 'A1',
      idRdv: 'R001',
      dateRdv: '2025-03-20',
      typeRdv: 'Installation',
      commentaire: 'No issues',
      siret: '123456789',
      statut: 'Confirmed', // Can be 'Confirmed', 'Installation', or 'Cancelled'
    },
    {
      nomPrenom: 'Jane Smith',
      entreprise: 'ABC Ltd.',
      telephone: '987-654-3210',
      adresse: '456 Secondary St.',
      email: 'jane.smith@example.com',
      agentId: 'A2',
      idRdv: 'R002',
      dateRdv: '2025-03-21',
      typeRdv: 'Installation',
      commentaire: 'Scheduled installation.',
      siret: '987654321',
      statut: 'Installation', // Status for this row
    },
    {
      nomPrenom: 'Alice Johnson',
      entreprise: 'DEF Inc.',
      telephone: '555-123-4567',
      adresse: '789 Tertiary Ave.',
      email: 'alice.johnson@example.com',
      agentId: 'A3',
      idRdv: 'R003',
      dateRdv: '2025-03-22',
      typeRdv: 'Installation',
      commentaire: 'Cancelled due to weather.',
      siret: '192837465',
      statut: 'Cancelled', // Status for this row
    },
    ,
    {
      nomPrenom: 'Alice Johnson',
      entreprise: 'DEF Inc.',
      telephone: '555-123-4567',
      adresse: '789 Tertiary Ave.',
      email: 'alice.johnson@example.com',
      agentId: 'A3',
      idRdv: 'R003',
      dateRdv: '2025-03-22',
      typeRdv: 'Installation',
      commentaire: 'Cancelled due to weather.',
      siret: '192837465',
      statut: 'Cancelled', // Status for this row
    },
    ,
    {
      nomPrenom: 'Alice Johnson',
      entreprise: 'DEF Inc.',
      telephone: '555-123-4567',
      adresse: '789 Tertiary Ave.',
      email: 'alice.johnson@example.com',
      agentId: 'A3',
      idRdv: 'R003',
      dateRdv: '2025-03-22',
      typeRdv: 'Installation',
      commentaire: 'Cancelled due to weather.',
      siret: '192837465',
      statut: 'Cancelled', // Status for this row
    },
    ,
    {
      nomPrenom: 'Alice Johnson',
      entreprise: 'DEF Inc.',
      telephone: '555-123-4567',
      adresse: '789 Tertiary Ave.',
      email: 'alice.johnson@example.com',
      agentId: 'A3',
      idRdv: 'R003',
      dateRdv: '2025-03-22',
      typeRdv: 'Installation',
      commentaire: 'Cancelled due to weather.',
      siret: '192837465',
      statut: 'Cancelled', // Status for this row
    },
  ]);

  const columns = [
    { header: 'NOM / PRENOM', field: 'nomPrenom' },
    { header: 'NOM ENTREPRISE', field: 'entreprise' },
    { header: 'TELEPHONE', field: 'telephone' },
    { header: 'ADRESSE', field: 'adresse' },
    { header: 'Email', field: 'email' },
    { header: 'Agent ID', field: 'agentId' },
    { header: 'ID-RDV', field: 'idRdv' },
    { header: 'DATE RDV', field: 'dateRdv' },
    { header: 'TYPE RDV', field: 'typeRdv' },
    { header: 'COMMENTAIRE AGENT', field: 'commentaire' },
    { header: 'SIRET', field: 'siret' },
    { header: 'STATUT', field: 'statut' },
  ];

  // Function to handle the update of client data
  const handleClientUpdate = (updatedClientData) => {
    setClientsData(prevData =>
      prevData.map(client =>
        client.idRdv === updatedClientData.idRdv ? updatedClientData : client
      )
    );
  };

  return (
    <div>
      <h2>Clients</h2>
      <TableComponent
        columns={columns}
        data={clientsData}
        onUpdate={handleClientUpdate} // Pass the update handler here
      />
    </div>
  );
};

export default ClientsPage;
