import React, { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const Doublon = ({ client }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month} ${hours}h${minutes}`;
  }; 
  const colordobel = client.duplicateList.length > 0 ? 'red' : 'blue';

  return (
    <>
      <p 
        style={{ margin: 0,whiteSpace: "nowrap", cursor: 'pointer', color: colordobel }}
        onClick={handleShow}
      >
        {client.nbrDuplicate} doublons
      </p>

      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Liste des Doublons</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {client.duplicateList && client.duplicateList.length > 0 ? (
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Client ID</th>
                  <th>Agent</th>
                  <th>Nom</th>
                  <th>Entreprise</th>
                  <th>Coordonnées</th>
                  <th>Date Création</th>
                  <th>Date RDV</th>
                </tr>
              </thead>
              <tbody>
                {client.duplicateList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.clientID}</td>
                    <td>{item.agentID}</td>
                    <td>{item.clientName}</td>
                    <td>{item.clientEntreprise}</td>
                    <td>{item.coords}</td>
                    <td>{formatDate(item.dateCreation)}</td>
                    <td>{formatDate(item.dateRdv)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>Aucun doublon trouvé.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Doublon;
