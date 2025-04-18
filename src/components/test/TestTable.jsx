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
import { getAllUsersAsync } from '../../features/userSlice';
import StatusEditor from './StatusEditor';
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

  // inside your component
  const handelUpdateClientNRP = (clientId, newNRP) => {
    const updatePar = localStorage.getItem('username');  // ← get it here

    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to change NRP to ${newNRP}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateClientNRP({ id: clientId, nrpData: newNRP, updatePar }))
          .unwrap()
          .then(() => Swal.fire('Updated!', 'The NRP has been updated.', 'success'))
          .catch(() => Swal.fire('Error!', 'There was an issue updating the NRP.', 'error'));
      }
    });
  };

  const userRole = localStorage.getItem('role');
  useEffect(() => {
    const role = localStorage.getItem('role');  // Get the role from localStorage
    dispatch(getAllUsersAsync());
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
      field: 'clientID',
      header: 'ID',
      body: (client) => (
        <>
          <p style={{ fontSize: "0.8rem", paddingRight: "15px", margin: "5px" }} > <b>{client.clientID}</b></p>
        </>
      ),
    },
    {
      field: 'prenom',
      header: 'Nom/Prenom ',
      body: (client) => (
        <div>
          <div style={{ whiteSpace: 'nowrap' }}>
            <a href={`/client/${client._id}`} className="text-primary hover:underline"> <b>{client.prenom}</b></a> {client.entreprise}
          </div>
          <div style={{ whiteSpace: 'nowrap' }} ><i className="pi" style={{ color: "green" }}>siret:</i> {client.siret}</div>
          <div style={{ whiteSpace: 'nowrap' }}><i className="pi pi-flag" style={{ fontSize: "0.8rem",color: "green" }} ></i> <span >{client.typeRdv}</span></div>
        </div>
      ),
    },
    {
      field: 'equipe',
      header: 'Equipe',
      body: (client) => (
        <>
          <div style={{ whiteSpace: 'nowrap' }}>
            <i className="pi pi-bookmark" style={{ fontSize: "0.8rem", color: "rgb(13, 110, 253)", marginRight: '5px' }}></i>
            {client.equipe ? ` ${client.equipe.name}` : 'No equipe'}
          </div>
          <div style={{ whiteSpace: 'nowrap' }}>
            <i className="pi pi-check" style={{ fontSize: "0.8rem", color: "green", marginRight: '5px' }}></i>
            {client.updatePar ? ` ${client.updatePar}` : ''}
          </div>
          <div style={{ whiteSpace: 'nowrap' }}>
            <i className="pi pi-file-import" style={{ fontSize: "0.8rem", color: "#d1b800", marginRight: '5px' }}></i>
            {client.agentId ? ` ${client.agentId}` : ''}
          </div>
        </>
      ),
    },
    {
      field: 'contact',
      header: 'Contact',
      body: (client) => (
        <div>
          <div><i className="pi pi-phone " style={{ fontSize: "0.8rem" }}></i> {client.phone}</div>
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
      body: (client) => (
        <StatusEditor
          clientId={client._id}  // Ensure client._id is available
          currentStatus={client.statusChantier}  // current status
        />
      )
    },
    {
      field: 'nrp',
      header: 'NRP',
      body: (client) => (
        <div className="d-flex align-items-center gap-1">
          {(userRole === 'admin' || userRole === 'supervisor') ? (
            <>
              {/* Minus Button */}
              <button
                className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center"
                aria-label="Decrease NRP"
                onClick={() => handelUpdateClientNRP(client._id, client.nrp - 1)}
                style={{ width: "18px", height: "18px" }}
                disabled={client.nrp === 0}
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
            </>
          ) : (
            <span style={{ minWidth: "20px", fontSize: "0.9rem", textAlign: "center" }}>
              {client.nrp ?? 0}
            </span>
          )}
        </div>
      )
    },
    {
      field: 'historyStatus',
      header: 'Historique',
      body: (client) => (
        <div
          style={{
            maxHeight: '3.4rem',           // height for ~2 lines
            overflowY: client.historyStatus?.length > 4 ? 'auto' : 'hidden',
            overflowX: 'hidden',           // prevent horizontal scrollbar
          }}
        >
          {client.historyStatus && client.historyStatus.length > 0 ? (
            [...client.historyStatus].reverse().map((status, index) => (  // reversed here
              <div
                key={index}
                style={{
                  fontSize: "0.75rem",
                  color: "rgb(13, 110, 253)",
                  whiteSpace: "nowrap",
                }}
              >
                {status}
              </div>
            ))
          ) : (
            <span style={{ fontSize: "0.75rem", color: "gray" }}>Aucun</span>
          )}
        </div>
      )
    }
    ,
    {
      field: 'observations',
      header: 'Observations',
      body: (client) => (
        <div className="d-flex align-items-center gap-1 flex-wrap">
          {(userRole === 'admin' || userRole === 'supervisor') && (
            <button
              className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center"
              aria-label="Add Observation"
              onClick={() => handleShow(client)}
              style={{ width: "18px", height: "18px" }}
            >
              <i className="pi pi-plus-circle" style={{ fontSize: "0.7rem", color: "green" }}></i>
            </button>
          )}
    
          {client.observations && client.observations.length > 0 ? (
            client.observations.map((obs, index) => (
              <OverlayTrigger
                key={index}
                placement="top"
                overlay={<Tooltip id={`tooltip-${index}`}>{obs}</Tooltip>}
              >
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "rgb(13, 110, 253)",
                    cursor: 'pointer',
                    maxWidth: '150px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  <p className='p-0 m-0'>
                    {obs.length > 15 ? `${obs.substring(0, 15)}...` : obs}
                  </p>
                </div>
              </OverlayTrigger>
            ))
          ) : (
            <span style={{ fontSize: "0.7rem", color: "gray" }}>No observations</span>
          )}
        </div>
      )
    },
    {
      field: 'updatedAt',
      header: 'Modifié',
      body: (client) => {
        const date = new Date(client.updatedAt);

        const day = String(date.getDate()).padStart(2, '0');      // 17
        const month = String(date.getMonth() + 1).padStart(2, '0');  // 04
        const hours = String(date.getHours()).padStart(2, '0');   // 15
        const minutes = String(date.getMinutes()).padStart(2, '0'); // 44

        return (
          <>
            <p style={{ margin: 0 }}>{`${day}/${month} ${hours}h${minutes}`}</p>
            <p style={{ color: "rgb(13, 110, 253)" }} >{client.updatePar}</p>

          </>

        );
      },
    },
    {
      field: 'dateCreation',
      header: 'Dates',
      body: (client) => {
        const date = new Date(client.dateCreation);

        const day = String(date.getDate()).padStart(2, '0');      // 17
        const month = String(date.getMonth() + 1).padStart(2, '0');  // 04
        const hours = String(date.getHours()).padStart(2, '0');   // 11
        const minutes = String(date.getMinutes()).padStart(2, '0'); // 17

        return (
          <>
            <p style={{ margin: 0 }}>{`${day}/${month} ${hours}h${minutes}`}</p>
          </>

        );
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
    ...(userRole === 'admin' ? [{
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
      )
    }] : []),
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
      <DataTable stripedRows value={clients} size={'small'} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '120%', fontSize: '0.75rem' }} loading={status === 'loading'}>
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
