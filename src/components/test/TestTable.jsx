import { Button } from "primereact/button";
import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchClients, addClient, removeClient, fetchClientsByAgentId } from '../../features/clientSlice';
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

const TableComponent = ({ onRowClick, data }) => {

  const dispatch = useDispatch();



  const columns = [
    {
      header: 'Nom / Prénom',
      field: 'prenom',
      render: (client) => (
        <Link to={`/client/${client._id}`} className="text-blue-500 hover:underline">
          {client.prenom}
        </Link>
      ),
    },
    { header: 'Entreprise', field: 'entreprise' },
    { header: 'Téléphone', field: 'phone' },
    { header: 'Adresse', field: 'adresse' },
    {
      header: 'Statut',
      field: 'statusChantier',
      render: (client) => {
        const getStatusColor = (status) => {
          switch (status) {
            case 'A RAPPELER':
              return '#FF6347'; // Red for A RAPPELER
            case 'Confirmer':
              return '#26ba12'; // Green for Confirmer
            case 'NRP':
              return '#f1c40f'; // Yellow for NRP
            case 'INJOIGNABLE':
              return '#e74c3c'; // Red for INJOIGNABLE
            case 'A RETRAITER':
              return '#8e44ad'; // Purple for A RETRAITER
            case 'CONFIRMER RÉGIE':
              return '#3498db'; // Blue for CONFIRMER RÉGIE
            case 'LEDS SOLAIRES':
              return '#2ecc71'; // Light Green for LEDS SOLAIRES
            case 'Chantier annuler':
              return '#95a5a6'; // Gray for Chantier annuler
            case 'SAV':
              return '#f39c12'; // Orange for SAV
            case 'RENVOYER EQUIPE SUR PLACE':
              return '#d35400'; // Dark Orange for RENVOYER EQUIPE SUR PLACE
            case 'RETOURNER RECUPERER LEDS':
              return '#1abc9c'; // Turquoise for RETOURNER RECUPERER LEDS
            case 'MANQUE PIÈCES':
              return '#e67e22'; // Orange for MANQUE PIÈCES
            case 'LIVRAISON POSTALE':
              return '#9b59b6'; // Purple for LIVRAISON POSTALE
            case 'Chantier Terminé':
              return '#16a085'; // Teal for Chantier Terminé
            case 'MANQUES RÉGLETTES':
              return '#d1b800'; // Yellow for MANQUES RÉGLETTES
            case 'MPR':
              return '#c0392b'; // Dark Red for MPR
            default:
              return '#808080'; // Gray for unknown status
          }
        };

        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i
              className="fas fa-square"
              style={{
                backgroundColor: getStatusColor(client.statusChantier),
                color: 'white',
                width: '15px',
                height: '15px',
                display: 'inline-block',
                borderRadius: '2px',
                marginRight: '8px',
              }}
            ></i>
            {client.statusChantier}
          </div>
        );
      },
    },

    { header: 'Email', field: 'email' },
    {
      header: 'Type RDV',
      field: 'typeRdv',
      render: (client) => {
        const getRdvTypeColor = (type) => {
          switch (type) {
            case 'Inspection':
              return '#FF6347'; // Red for A RAPPELER
            case 'Initial':
              return '#26ba12'; // Green for Confirmer
            case 'Consultation':
              return '#f1c40f'; // Yellow for NRP
            case 'INJOIGNABLE':
              return '#e74c3c'; // Red for INJOIGNABLE
            case 'Contrôle':
              return '#8e44ad'; // Purple for A RETRAITER
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
      ),
    }
  ];
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


  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th style={{ backgroundColor: '#337ab7', color: "white" }} key={index}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} style={{ cursor: "pointer" }}>
            {columns.map((col, colIndex) => (
              <td key={colIndex} style={{ height: '5px', verticalAlign: 'middle' }}>
                {col.render ? col.render(row) : row[col.field]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableComponent;
