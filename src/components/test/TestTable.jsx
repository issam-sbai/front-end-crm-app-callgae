import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, removeClient, updateClientNRP, addObservation, getClientsByEquipeThunk } from '../../features/clientSlice';
import Swal from 'sweetalert2';
import 'primeicons/primeicons.css';
import Modal from 'react-bootstrap/Modal';
import { Button as BootstrapButton } from 'react-bootstrap';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const TableComponent = ({ onRowClick }) => {
  const dispatch = useDispatch();

  // Fetch clients from Redux store
  const clients = useSelector((state) => state.clients.clientsx);
  const status = useSelector((state) => state.clients.status);
  const error = useSelector((state) => state.clients.error);

  const [showModal, setShowModal] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);  // Track the client being edited

  // Popup for adding new observation
  const handleShow = (client) => {
    setSelectedClient(client);
    setTextAreaValue(''); // Clear textarea when modal is opened for adding new observation
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  const handleSave = () => {
    if (selectedClient) {
      // Add new observation entered in the textarea
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const formattedDate = `${day}/${month}`;
      const newObservation = `${formattedDate} ${textAreaValue.trim()}`;  // Prevent saving empty observations
      if (newObservation) {
        // Dispatch action to add new observation
        dispatch(addObservation({ id: selectedClient._id, newObservation }))
          .then(() => {
            Swal.fire('Saved!', 'The observation has been added.', 'success');
            setShowModal(false); // Close modal after saving
          })
          .catch(() => {
            Swal.fire('Error!', 'There was an issue saving the observation.', 'error');
          });
      } else {
        Swal.fire('Error!', 'Observation cannot be empty.', 'warning');
      }
    }
  };

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
    const role = localStorage.getItem('role');  // Get the role from localStorage
    if (role === 'admin') {
      // Admin: Fetch all clients
      dispatch(fetchClients());
    } else if (role === 'supervisor') {
      // Supervisor: Get equipId from localStorage and fetch clients by equipe
      const equipId = localStorage.getItem("equipId");
      // console.log(equipId);

      if (equipId) {
        dispatch(getClientsByEquipeThunk(equipId));
        
      }
    }
  }, [dispatch]);

  // Runs every time clients are updated


  const columns = [
    {
      field: 'prenom',
      header: 'Nom',
      body: (client) => (
        <>
          <a href={`/client/${client._id}`} className="text-primary hover:underline">
            <b>{client.prenom}</b>
          </a>
          <div><i className="pi" style={{ color: "green" }}>siret:</i> {client.siret}</div>
        </>
      ),
    },
    {
      field: 'entreprise',
      header: 'Entreprise',
      body: (client) => (
        <div>
          <div><i className="pi pi-building-columns "></i>  {client.entreprise}</div>
          <div><i className="pi pi-users" style={{ fontSize: "0.8rem", color: "green" }} ></i>  {client.equipe ? client.equipe.name : 'No equipe'}    </div>
          <div><i className="pi pi-flag" style={{ fontSize: "0.8rem"}} ></i> <span style={{ color: "green" }}>{client.flag}</span></div>
          
        </div>
      ),
    },
    {
      field: 'contact',
      header: 'Contact',
      body: (client) => (
        <div>
          <div><i className="pi pi-phone " style={{ fontSize: "0.8rem"}}></i> {client.phone}</div>
          <div>{client.email}</div>
        </div>
      ),
    },
    {
      field: 'adresse',
      header: 'Adresse',
      body: (client) => {
        // Create the address string
        const address = `${client.adresse} ${client.ville} ${client.codepostal}`;

        // Function to fetch coordinates and open Geoportail with them
        const openGeoportail = async () => {
          const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
          const response = await fetch(geocodeUrl);
          const data = await response.json();

          if (data && data[0]) {
            const latitude = data[0].lat;
            const longitude = data[0].lon;

            // Construct Geoportail URL with lat, lon
            const geoportailUrl = `https://www.geoportail.gouv.fr/carte?c=${longitude},${latitude}&z=19&l0=GEOGRAPHICALGRIDSYSTEMS.MAPS.3D::GEOPORTAIL:OGC:WMTS==aggregate(1)&d1=1256334(0)&l2=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR::GEOPORTAIL:OGC:WMTS(1)&d3=1256360(0)&d4=1256322(0)&d5=1256364(0)&d6=1256385(1)&d7=1256377(0)&l8=GEOGRAPHICALGRIDSYSTEMS.PLANIGN::GEOPORTAIL:OGC:WMTS(1)&l9=CADASTRALPARCELS.PARCELS::GEOPORTAIL:OGC:WMTS(1)&l10=AD.Address::INSPIRE:OGC:WMS+(1)&permalink=yes`;

            // Open Geoportail in a new tab
            window.open(geoportailUrl, '_blank');
          } else {
            alert('Address not found!');
          }
        };

        return (
          <div>
            <div >
              <div>{client.adresse} </div>
              <div>{client.ville} {client.codepostal}</div>
            </div>
            <div>
              <a
                href="#"
                onClick={openGeoportail}  // Call geocoding and open Geoportail
                style={{ textDecoration: 'none', color: 'inherit', marginRight: '5px' }}
              >
                <i className="pi pi-map" style={{ fontSize: "0.8rem", color: "red" }}></i>
              </a>
              <a
                href={`https://www.google.com/maps?q=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit', marginRight: '5px' }}
              >
                <i className="pi pi-map-marker" style={{ fontSize: "0.8rem", color: "rgb(13, 110, 253)" }}></i>
              </a>

            </div>
          </div>
        );
      },
    },

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
            case 'CONFIRMER RÉGIE': return '#16a085'; // Blue
            case 'LEDS SOLAIRES': return '#2ecc71'; // Light Green
            case 'Chantier annuler': return '#95a5a6'; // Gray
            case 'SAV': return '#f39c12'; // Orange
            case 'RENVOYER EQUIPE SUR PLACE': return '#d35400'; // Dark Orange
            case 'RETOURNER RECUPERER LEDS': return '#1abc9c'; // Turquoise
            case 'MANQUE PIÈCES': return '#e67e22'; // Orange
            case 'LIVRAISON POSTALE': return '#9b59b6'; // Purple
            case 'Chantier Terminé': return '#3498db'; // Teal
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
    },
    {
      field: 'historyStatus',
      header: 'Historique',
      body: (client) => (
        <div>
          {client.historyStatus && client.historyStatus.length > 0 ? (
            client.historyStatus.map((status, index) => (
              <div key={index} style={{ fontSize: "0.75rem", color: "rgb(13, 110, 253)" }}>
                {status}
              </div>
            ))
          ) : (
            <span style={{ fontSize: "0.75rem", color: "gray" }}>Aucun</span>
          )}
        </div>
      ),
    },


    {
      field: 'observations',
      header: 'Observations',
      body: (client) => (
        <div>
          <button
            className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center"
            aria-label="Add Observation"
            onClick={() => handleShow(client)}  // Open modal on click
            style={{ width: "18px", height: "18px" }}
          >
            <i className="pi pi-plus-circle" style={{ fontSize: "0.7rem", color: "green" }}></i>
          </button>
          {client.observations && client.observations.length > 0 ? (
            client.observations.map((obs, index) => (
              <OverlayTrigger
                key={index}
                placement="top"  // You can change to "right", "bottom", or "left"
                overlay={<Tooltip id={`tooltip-${index}`}>{obs}</Tooltip>} // Show the full observation text
              >
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "rgb(13, 110, 253)",
                    cursor: 'pointer',
                    maxWidth: '150px',    // Adjust based on your design
                    whiteSpace: 'nowrap', // Prevent wrapping
                    overflow: 'hidden',   // Hide overflowed text
                    textOverflow: 'ellipsis' // Add ellipsis for truncated text
                  }}
                >
                  {/* Truncate text to 15 characters and add ellipsis if longer */}
                  <p className='p-0 m-0' >
                    {obs.length > 15 ? `${obs.substring(0, 15)}...` : obs}
                  </p>
                </div>
              </OverlayTrigger>
            ))
          ) : (
            <span style={{ fontSize: "0.7rem", color: "gray" }}>No observations</span>
          )}
        </div>
      ),
    }
    
,

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
      <DataTable stripedRows value={clients} size={'small'} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '100%', fontSize: '0.75rem'  }} loading={status === 'loading'}>
        {columns.map((col, index) => (
          <Column
            key={index}
            field={col.field}
            header={col.header}
            body={col.body}
          />
        ))}
      </DataTable>

      {/* Modal for adding new observation */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Observation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className="form-control"
            style={{ width: "100%", height: "130px" }}
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
            placeholder="Enter new observation"
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <BootstrapButton variant="secondary" onClick={handleClose}>
            Close
          </BootstrapButton>
          <BootstrapButton variant="primary" onClick={handleSave}>
            Save changes
          </BootstrapButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TableComponent;
