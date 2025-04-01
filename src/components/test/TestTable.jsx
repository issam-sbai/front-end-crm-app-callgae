import React, { useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, removeClient, updateClientNRP } from '../../features/clientSlice';
import Swal from 'sweetalert2';
import 'primeicons/primeicons.css';
import { InputNumber } from 'primereact/inputnumber';
import axios from 'axios';

const TableComponent = ({ onRowClick }) => {
  const dispatch = useDispatch();

  // Fetch clients from Redux store
  const clients = useSelector((state) => state.clients.clientsx);
  const status = useSelector((state) => state.clients.status);
  const error = useSelector((state) => state.clients.error);


  const handelUpdateClientNRP = (clientId, newNRP) => {
    // First, confirm with the user if they are sure about the NRP change
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to change NRP to ${newNRP}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Dispatch the action to update NRP if the user confirmed
        dispatch(updateClientNRP({ id: clientId, nrpData: newNRP }))
          .then(() => {
            // Success alert
            Swal.fire('Updated!', 'The NRP has been updated.', 'success');
          })
          .catch((error) => {
            // Error alert
            Swal.fire('Error!', 'There was an issue updating the NRP.', 'error');
          });
      }
    });
  };

  useEffect(() => {
    dispatch(fetchClients());
  }, []);

  const columns = [
    {
      field: 'prenom',
      header: 'Nom',
      body: (client) => (
        <>
          <a href={`/client/${client._id}`} className="text-primary hover:underline">
            <b>{client.prenom}</b>
          </a>
          <div><i className="pi pi-ticket" style={{ color: "blue" }}></i> {client.siret}</div>
        </>
      ),
    },
    {
      field: 'entreprise',
      header: 'Entreprise',
      body: (client) => (
        <div>
          <div><i className="pi pi-building-columns "></i>  {client.entreprise}</div>
          <div><i className="pi pi-flag"></i>  {client.flag}</div>
        </div>
      ),
    },
    {
      field: 'contact',
      header: 'Contact',
      body: (client) => (
        <div>
          <div><i className="pi pi-phone "></i> {client.phone}</div>
          <div><i className="pi pi-at "></i> {client.email}</div>
        </div>
      ),
    },
    {
      field: 'adresse',
      header: 'Adresse',
      body: (client) => (
        <div>
          <div>{client.adresse}</div>
          <div>{client.codepostal}</div>
        </div>
      ),
    },
    {
      field: 'nrp',
      header: 'NRP',
      body: (client) => (
        <div className="d-flex align-items-center gap-1">
          {/* Minus Button */}
          <button
            className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center"
            aria-label="Decrease NRP"
            onClick={() => handelUpdateClientNRP(client._id, client.nrp - 1)}
            style={{ width: "18px", height: "18px" }}
            disabled={client.nrp === 0}  // Disable the button if NRP is 0
          >
            <i className="pi pi-minus-circle" style={{ fontSize: "0.8rem", color: "red" }}></i>
          </button>
          <span style={{ minWidth: "20px", fontSize: "0.9rem", textAlign: "center" }}>
              {client.nrp ?? 0}
            </span>
          <button
            className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center"
            aria-label="Increase NRP"
            onClick={() => handelUpdateClientNRP(client._id, client.nrp + 1)}
            style={{ width: "18px", height: "18px" }}
          >
            <i className="pi pi-plus-circle" style={{ fontSize: "0.8rem", color: "green" }}></i>
          </button>

        </div>

      ),
    }


    ,
    {
      field: 'statusChantier',
      header: 'Statut',
      body: (client) => {
        const getStatusColor = (status) => {
          switch (status) {
            case 'A RAPPELER': return '#FF6347'; // Red
            case 'NO STATUS': return '#808080'; // Gray
            case 'Confirmer': return '#26ba12'; // Green
            case 'NRP': return '#f1c40f'; // Yellow
            case 'INJOIGNABLE': return '#e74c3c'; // Red
            case 'A RETRAITER': return '#8e44ad'; // Purple
            case 'CONFIRMER RÉGIE': return '#3498db'; // Blue
            case 'LEDS SOLAIRES': return '#2ecc71'; // Light Green
            case 'Chantier annuler': return '#95a5a6'; // Gray
            case 'SAV': return '#f39c12'; // Orange
            case 'RENVOYER EQUIPE SUR PLACE': return '#d35400'; // Dark Orange
            case 'RETOURNER RECUPERER LEDS': return '#1abc9c'; // Turquoise
            case 'MANQUE PIÈCES': return '#e67e22'; // Orange
            case 'LIVRAISON POSTALE': return '#9b59b6'; // Purple
            case 'Chantier Terminé': return '#16a085'; // Teal
            case 'MANQUES RÉGLETTES': return '#d1b800'; // Gold
            case 'MPR': return '#c0392b'; // Dark Red
            default: return '#808080'; // Gray for unknown status
          }
        };

        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i
              className="fas fa-circle"
              style={{
                backgroundColor: getStatusColor(client.statusChantier),
                color: 'white',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                marginRight: '8px',
              }}
            ></i>
            {client.statusChantier}
          </div>
        );
      },
    },
    {
      field: 'dateCreation',
      header: 'Dates',
      body: (client) => {
        const formattedDateCreation = new Date(client.dateCreation).toLocaleDateString('en-CA');
        return formattedDateCreation;
      },
    },
    {
      field: 'dateRdv',
      header: 'Date RDV',
      body: (client) => {
        const formattedDateRdv = new Date(client.dateRdv).toLocaleDateString('en-CA');
        return formattedDateRdv;
      },
    },
    {
      header: 'Delete',
      body: (client) => (
        <button
          className="btn rounded-circle"
          aria-label="Cancel"
          onClick={() => handleDeleteClient(client._id)}
          style={{
            width: "35px",
            height: "35px",
            padding: "0",
            borderRadius: "50%",
          }}
        >
          <i className="pi pi-times-circle" style={{ fontSize: "1.2rem", color: 'red' }}></i>
        </button>
      ),
    },
  ];

  // Handle delete client action
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
        Swal.fire('Deleted!', 'The client has been deleted.', 'success');
      }
    });
  };

  return (
    <div className="card">
      <DataTable stripedRows value={clients} size={'small'} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} loading={status === 'loading'}>
        {columns.map((col, index) => (
          <Column
            key={index}
            field={col.field}
            header={col.header}
            body={col.body}
          />
        ))}
      </DataTable>
    </div>
  );
};

export default TableComponent;
