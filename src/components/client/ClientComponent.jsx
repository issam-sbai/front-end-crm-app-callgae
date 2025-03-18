import React, { useEffect, useState } from 'react';
import TableComponent from './TableComponent';
import AddClientModal from './AddClientModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, addClient, removeClient, fetchClientsByAgentId } from '../../features/clientSlice';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ClientComponent = () => {
  const userRole = localStorage.getItem("role"); // Get role from localStorage
  const agentId = localStorage.getItem("agentId"); // Get agentId from localStorage

  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients.clientsx);
  const status = useSelector((state) => state.clients.status);
  const error = useSelector((state) => state.clients.error);

  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      if (userRole === 'admin') {
        dispatch(fetchClients()); // Fetch clients for admin
      } else if (userRole === 'agent') {
        dispatch(fetchClientsByAgentId(agentId)); // Fetch clients for a specific agent
      }
    }
  }, [dispatch, status, userRole, agentId]);

  const handleAddClient = (newClient) => {
    dispatch(addClient(newClient));
    setShowAddModal(false);
  };

  const handleDeleteClient = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeClient(id));
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  };

  const columns = [
    {
      header: 'Nom / Prénom',
      field: 'nomPrenom',
      render: (client) => (
        <Link to={`/client/${client._id}`} className="text-blue-500 hover:underline">
          {client.nomPrenom}
        </Link>
      ),
    },
    { header: 'Entreprise', field: 'entreprise' },
    { header: 'Téléphone', field: 'telephone' },
    { header: 'Adresse', field: 'adresse' },
    { header: 'Email', field: 'email' },
    { header: 'Statut', field: 'statut' },
    { header: 'Date RDV', field: 'dateRdv' },
    {
      header: 'Actions',
      render: (client) => (
        userRole !== 'agent' && (
          <button className="btn btn-danger" onClick={() => handleDeleteClient(client._id)}>
            Delete
          </button>
        )
      ),
    },
  ];

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {userRole !== 'agent' && (
        <button className="btn btn-primary mb-3" onClick={() => setShowAddModal(true)}>
          Add Client
        </button>
      )}

      <TableComponent columns={columns} data={clients} />

      <div className="d-flex justify-content-center mt-3">
        {/* Pagination controls */}
      </div>

      <AddClientModal show={showAddModal} onHide={() => setShowAddModal(false)} onAdd={handleAddClient} />
    </div>
  );
};

export default ClientComponent;
