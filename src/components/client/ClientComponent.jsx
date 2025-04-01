import React, { useEffect, useState } from 'react';
import TableComponent from './TableComponent';
import AddClientModal from './AddClientModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, addClient, removeClient, fetchClientsByAgentId } from '../../features/clientSlice';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import FilterComponent from './tablecompe/FilterComponent';
import { Button } from 'primereact/button';

const ClientComponent = () => {
  const userRole = localStorage.getItem("role");
  const agentId = localStorage.getItem("agentId");

  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients.clientsx);
  const status = useSelector((state) => state.clients.status);
  const error = useSelector((state) => state.clients.error);

  const [showAddModal, setShowAddModal] = useState(false);
  const [filteredClients, setFilteredClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 15;

  useEffect(() => {
    if (status === 'idle') {
      if (userRole === 'admin') {
        dispatch(fetchClients());
      } else if (userRole === 'agent') {
        dispatch(fetchClientsByAgentId(agentId));
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

  const handleFilter = (filterData) => {
    fetch('http://192.168.100.26:5000/api/clients/filterClients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filterData),
    })
      .then((response) => response.json())
      .then((data) => {
        setFilteredClients(data);
        // console.log("Filtered Clients:", data);
      })
      .catch((error) => {
        console.error('Error filtering clients:', error);
      });
  };

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.length > 0 ? filteredClients : clients;
  const displayedClients = currentClients.slice(indexOfFirstClient, indexOfLastClient);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(currentClients.length / clientsPerPage); i++) {
    pageNumbers.push(i);
  }

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
    {
      header: 'Statut',
      field: 'statut',
      render: (client) => {
        const getStatusColor = (status) => {
          switch (status) {
            case 'Confirmed':
              return '#26ba12'; // Green for Confirmed
            case 'Cancelled':
              return '#FF6347'; // Red for Cancelled
            case 'Installation':
              return '#4169E1'; // Blue for Installation
            default:
              return '#808080'; // Gray for Non statué or unknown status
          }
        };

        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i
              className="fas fa-square"
              style={{
                backgroundColor: getStatusColor(client.statut),
                color: 'white',
                width: '15px',
                height: '15px',
                display: 'inline-block',
                borderRadius: '2px',
                marginRight: '8px',
              }}
            ></i>
            {client.statut}
          </div>
        );
      },
    },
    { header: 'Email', field: 'email' },


    {
      header: 'Type RDV',
      field: 'typeRdv',  // Assuming typeRdv is a field in your client object
      render: (client) => {
        const getRdvTypeColor = (type) => {
          switch (type) {
            case 'Intérieur':
              return '#FFA07A'; // Red for Intérieur
            case 'Extérieur':
              return '#FFD700'; // Blue for Extérieur
            default:
              return '#808080'; // Gray for unknown or other types
          }
        };

        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i
              className="fas fa-circle"
              style={{
                backgroundColor: getRdvTypeColor(client.typeRdv),
                color: 'white',
                width: '15px',
                height: '15px',
                display: 'inline-block',
                borderRadius: '50%',
                marginRight: '8px',
              }}
            ></i>
            {client.typeRdv}
          </div>
        );
      },
    },
    { header: 'Date RDV', field: 'dateRdv' },
    {
      header: 'Delete',
      render: (client) => (
        userRole !== 'agent' && (
          <div style={{ display: 'inline-block' }}>
            <Button 
              icon="pi pi-times" 
              rounded 
              text 
              raised 
              severity="danger" 
              aria-label="Cancel"
              onClick={() => handleDeleteClient(client._id)} // Handling delete
              style={{
                width: '40px',
                height: '40px',
                padding: '0',
                borderRadius: '50%',  // Ensures it's perfectly round
              }} 
            />
          </div>
        )
      ),
    }
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
        <div>
          <FilterComponent onApplyFilter={handleFilter} />
          <button className="btn btn-primary mb-3" onClick={() => setShowAddModal(true)}>
            Add Client
          </button>
        </div>
      )}

      <TableComponent columns={columns} data={displayedClients} />
      <br />

      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-secondary mr-2"
          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`btn ${currentPage === number ? 'btn-primary' : 'btn-light'} mx-1`}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}

        <button
          className="btn btn-secondary ml-2"
          onClick={() => setCurrentPage(currentPage < pageNumbers.length ? currentPage + 1 : currentPage)}
          disabled={currentPage === pageNumbers.length}
        >
          Next
        </button>
      </div>

      <AddClientModal show={showAddModal} onHide={() => setShowAddModal(false)} onAdd={handleAddClient} />
    </div>
  );
};

export default ClientComponent;
