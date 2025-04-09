import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import FilterComponenttest from './TestFilter';
import TestTable from './TestTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import SvgTest from './SvgTest';
import AddClient from './AddClient';
import useClient from '../../hooks/useClient'; 
import { useDispatch } from "react-redux";
import { addClient ,fetchClients, getClientsByEquipeThunk } from "../../features/clientSlice";
import {fetchEquipes } from "../../features/equipeSlice";
const TestPage = () => {
  const [showMap, setShowMap] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const dispatch = useDispatch();

  const { exportToCSV } = useClient();

  const handleShowMap = () => setShowMap(true);
  const handleCloseMap = () => setShowMap(false);

  const handleAddClient = async (newClient) => {
    try {
      await dispatch(addClient(newClient)); // wait until the client is added
  
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
    } catch (error) {
      console.error("Failed to add client:", error);
    }
  };
  useEffect(() => {
    dispatch(fetchEquipes());  // Get the role from localStorage
    }, []);


  return (
    <>
      <FilterComponenttest />
      <br />
      <div className="d-flex justify-content-start align-items-center mb-3">
        <Button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          Add Client
        </Button>

        <Button className="btn btn-primary mx-2" onClick={handleShowMap}>
          Show Department
        </Button>
        <Button className="btn btn-primary" onClick={exportToCSV}>
          Export to CSV
        </Button>
      </div>

      {/* Pass clients as a prop to TestTable */}
      <TestTable />
      <br />

      {/* Modal Popup for the Department Map */}
      <Modal show={showMap} onHide={handleCloseMap} size="lg">
        <Modal.Body>
          <SvgTest />
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
