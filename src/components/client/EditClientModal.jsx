import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditClientModal = ({ show, onHide, client, onSave }) => {
  const [updatedClient, setUpdatedClient] = useState({
    nomPrenom: '',
    entreprise: '',
    telephone: '',
    adresse: '',
    cp: '',
    email: '',
    agentId: '',
    idRdv: '',
    dateRdv: '',
    typeRdv: 'Intérieur', 
    commentaire: '',
    siret: '',
    statut: 'Non statué', 
    civilite: 'M.',
    telephone2: '',
  });

  useEffect(() => {
    if (client) {
      setUpdatedClient(client);
    }
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedClient({ ...updatedClient, [name]: value });
  };

  const handleSubmit = () => {
    onSave(updatedClient);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Client</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="d-flex gap-4 mb-4">
            <div className="flex-fill">
              <Form.Group>
                <Form.Label>Nom / Prénom</Form.Label>
                <Form.Control
                  type="text"
                  name="nomPrenom"
                  value={updatedClient.nomPrenom}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div className="flex-fill">
              <Form.Group>
                <Form.Label>Entreprise</Form.Label>
                <Form.Control
                  type="text"
                  name="entreprise"
                  value={updatedClient.entreprise}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>

          <div className="d-flex gap-4 mb-4">
            <div className="flex-fill">
              <Form.Group>
                <Form.Label>Téléphone</Form.Label>
                <Form.Control
                  type="text"
                  name="telephone"
                  value={updatedClient.telephone}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div className="flex-fill">
              <Form.Group>
                <Form.Label>Téléphone 2</Form.Label>
                <Form.Control
                  type="text"
                  name="telephone2"
                  value={updatedClient.telephone2}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>

          <div className="d-flex gap-4 mb-4">
            <div className="flex-fill">
              <Form.Group>
                <Form.Label>Civilité</Form.Label>
                <Form.Control
                  type="text"
                  name="civilite"
                  value={updatedClient.civilite}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div className="flex-fill">
              <Form.Group>
                <Form.Label>Siret</Form.Label>
                <Form.Control
                  type="text"
                  name="siret"
                  value={updatedClient.siret}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>

          <div className="d-flex gap-4 mb-4">
            <div className="flex-fill">
              <Form.Group>
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"
                  name="adresse"
                  value={updatedClient.adresse}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div className="flex-fill">
              <Form.Group>
                <Form.Label>Code postal</Form.Label>
                <Form.Control
                  type="text"
                  name="cp"
                  value={updatedClient.cp}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>

          <div className="d-flex gap-4 mb-4">
            <div className="flex-fill">
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={updatedClient.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div className="flex-fill">
              <Form.Group>
                <Form.Label>Date RDV</Form.Label>
                <Form.Control
                  type="date"
                  name="dateRdv"
                  value={updatedClient.dateRdv}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>

          <div className="d-flex gap-4 mb-4">
            <div className="flex-fill">
              <Form.Group>
                <Form.Label>Statut</Form.Label>
                <Form.Control
                  as="select"
                  name="statut"
                  value={updatedClient.statut}
                  onChange={handleChange}
                >
                  <option value="Non statué">Non statué</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Installation">Installation</option>
                  <option value="Cancelled">Cancelled</option>
                </Form.Control>
              </Form.Group>
            </div>
            <div className="flex-fill">
              <Form.Group>
                <Form.Label>Type RDV</Form.Label>
                <Form.Control
                  as="select"
                  name="typeRdv"
                  value={updatedClient.typeRdv}
                  onChange={handleChange}
                >
                  <option value="Intérieur">Intérieur</option>
                  <option value="Extérieur">Extérieur</option>
                </Form.Control>
              </Form.Group>
            </div>
          </div>

          <div className="d-flex gap-4 mb-4">
            <div className="flex-fill">
              <Form.Group>
                <Form.Label>Commentaire Agent</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="commentaire"
                  value={updatedClient.commentaire || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div className="flex-fill">
              <Form.Group>
                <Form.Label>RDV Info</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="rdvInfo"
                  value={updatedClient.rdvInfo || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditClientModal;
