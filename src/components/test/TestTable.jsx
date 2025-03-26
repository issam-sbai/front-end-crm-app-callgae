import { Button } from "primereact/button";
import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const TableComponent = ({ onRowClick,  data }) => {
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
            case 'Confirmed':
              return '#26ba12'; // Green for Confirmed
            default:
              return '#808080'; // Gray for Non statué or unknown status
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
            case 'Initial Consultation':
              return '#FFA07A'; // Red for Initial Consultation
            case 'Follow-up':
              return '#FFD700'; // Yellow for Follow-up
            default:
              return '#808080'; // Gray for other types
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
          <tr key={rowIndex} onClick={() => onRowClick(row)} style={{ cursor: "pointer" }}>
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
