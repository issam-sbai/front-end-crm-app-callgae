import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import FilterComponenttest from './TestFilter';
import TestTable from './TestTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import SvgTest from './SvgTest';
import AddClient from './AddClient';
import useClient from '../../hooks/useClient';
import { useDispatch, useSelector } from "react-redux";
import { addClient, checkDuplicateClient, fetchClients, fetchClientsByAgentId, getClientsByEquipeThunk } from "../../features/clientSlice";
import { fetchEquipes } from "../../features/equipeSlice";
import RegionCards from './RegionCards';

const TestPage = () => {
  const [selectedDeps, setSelectedDeps] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [fieldsToShow, setFieldsToShow] = useState([
    'prenom',
    'department',
    'flag',
    'statusChantier',
    'typeRdv',
    'equipe',
    'agent',
    'dateCreated',
    'dateRdv',
  ]);
  const clients = useSelector((state) => state.clients.clientsx);
  const clientsLength = clients.length;

  const dispatch = useDispatch();
  const { exportToCSV } = useClient();

  const handleShowMap = () => setShowMap(true);
  const handleCloseMap = () => setShowMap(false);

  const handleAddClient = async (newClient) => {
    try {
      const result = await dispatch(addClient(newClient));


      const role = localStorage.getItem('role');
      if (role === 'admin') {
        dispatch(fetchClients());
      } else if (role === 'supervisor') {
        const equipId = localStorage.getItem("equipId");
        if (equipId) {
          dispatch(getClientsByEquipeThunk(equipId));
        }
      }
      setShowAddModal(false);
      await dispatch(checkDuplicateClient({
        clientId: result.payload[0]._id,
        clientData: newClient
      }));


    } catch (error) {
      console.error("Failed to add client:", error);
    }
  };

  const handleSelectedDeps = (departments) => {
    // Update the parent state with the departments
    setSelectedDeps(departments);
  };

  useEffect(() => {
    dispatch(fetchEquipes());  // Always fetch equipes first

    const role = localStorage.getItem("role");
    const equipId = localStorage.getItem("equipId");
    const username = localStorage.getItem("username");

    if (role === "admin" || role === "superSupervisor") {
      dispatch(fetchClients());
    } else if (role === "superviseur") {
      if (equipId) {
        dispatch(getClientsByEquipeThunk(equipId));
      }
    } else if (role === "agent") {
      if (username) {
        dispatch(fetchClientsByAgentId(username));
      }
    }
  }, [dispatch]);

  const role = localStorage.getItem("role");  // Get role here for rendering

  return (
    <>
      {/* Only show filter if not agent */}
      {role !== 'agent' && <FilterComponenttest fieldsToShow={fieldsToShow} filterData={selectedDeps} />}

      <div className="d-flex justify-content-start align-items-center mt-3 mb-3">
        <Button
          className="btn btn-primary"
          style={{ fontSize: '0.75rem' }}
          onClick={() => setShowAddModal(true)}
        >
          Ajouter client <span style={{ fontSize: '0.85rem' }}>{clientsLength}</span>
        </Button>
        

      <Button
        className="btn btn-primary mx-2"
        style={{ fontSize: '0.75rem' }}
        onClick={handleShowMap}
      >
        Département
      </Button>

      {
        role === 'admin' && (
          <Button
            className="btn btn-primary"
            style={{ fontSize: '0.75rem' }}
            onClick={exportToCSV}
          >
            Export to CSV
          </Button>
        )
      }
    </div >

      <TestTable />
      <br />

      <Modal show={showMap} fullscreen={true} onHide={handleCloseMap} size="lg">
        <Modal.Body>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <SvgTest />
      <RegionCards onSelectDeps={handleSelectedDeps}  />
    </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMap}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <AddClient show={showAddModal} onAdd={handleAddClient} onHide={() => setShowAddModal(false)} />
    </>
  );
};

export default TestPage;
