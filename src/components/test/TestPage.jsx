import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addClient, fetchClients } from '../../features/clientSlice'; // Import the async action
import FilterComponenttest from './TestFilter';
import TestTable from './TestTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import SvgTest from './SvgTest';
import AddClient from './AddClient';

const TestPage = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients.clientsx);
  const status = useSelector((state) => state.clients.status);
  const error = useSelector((state) => state.clients.error);
  const [showMap, setShowMap] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  

  // Fetch clients when the component mounts
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchClients()); // Dispatch the action to fetch clients
    }
  }, [dispatch, status]);

  const handleAddClient = (newClient) => {
    dispatch(addClient(newClient));
    setShowAddModal(false);
  };

  const handleApplyFilter = (filteredClients) => {
    // Update the filtered clients state in Redux (optional)
    
  };

  const handleShowMap = () => setShowMap(true);
  const handleCloseMap = () => setShowMap(false);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error fetching clients: {error}</div>;
  }

  return (
    <>
      <FilterComponenttest />
      <br />
      <div className="d-flex justify-content-start align-items-center mb-3">
        <Button className="btn btn-primary "  onClick={() => setShowAddModal(true)}>
          Add Client
        </Button>

        <Button className="btn btn-primary mx-2" onClick={handleShowMap}>
          Show Department
        </Button>
      </div>
      
      <TestTable data={clients} />
      <br />

      {/* Modal Popup for the Department Map */}
      <Modal show={showMap} onHide={handleCloseMap} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Department Map</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SvgTest clientData={clients} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMap}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <AddClient show={showAddModal} onHide={() => setShowAddModal(false)} onAdd={handleAddClient} />
    </>
  );
};

export default TestPage;
