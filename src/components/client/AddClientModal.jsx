import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const AddClientModal = ({ show, onHide, onAdd }) => {
    // Initial state with default 'Non statué' for statut and new fields
    const [newClient, setNewClient] = useState({
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

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewClient({ ...newClient, [name]: value });
    };

    const validateForm = () => {
        // Check required fields
        const requiredFields = ['nomPrenom', 'entreprise', 'telephone', 'adresse', 'cp', 'email', 'agentId', 'idRdv', 'dateRdv', 'siret', 'civilite'];
        for (let field of requiredFields) {
            if (!newClient[field]) {
                return `${field} is required`;
            }
        }
        return ''; // No error
    };

    const handleSubmit = () => {
        // Validate the form before submission
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        // If no errors, submit the form data
        onAdd(newClient);

        // Reset form fields
        setNewClient({
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

        // Close the modal after adding
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Add New Client</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>} {/* Show error message */}

                <Form>
                    {/* Row with two fields side by side */}
                    <div className="d-flex mb-3">
                        <div className="flex-fill" style={{ marginLeft: '10px' }}>
                            <Form.Group>
                                <Form.Label>ID RDV</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="idRdv"
                                    value={newClient.idRdv}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </div>
                        <div className="flex-fill" style={{ marginLeft: '10px' }}>
                            <Form.Group>
                                <Form.Label>Nom / Prénom</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nomPrenom"
                                    value={newClient.nomPrenom}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </div>
                        <div className="flex-fill" style={{ marginLeft: '10px' }}>
                            <Form.Group>
                                <Form.Label>Entreprise</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="entreprise"
                                    value={newClient.entreprise}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </div>
                    </div>

                    {/* Row with two fields side by side */}
                    <div className="d-flex mb-3">
                        <div className="flex-fill" style={{ marginLeft: '10px' }}>
                            <Form.Group>
                                <Form.Label>Téléphone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telephone"
                                    value={newClient.telephone}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </div>
                        <div className="flex-fill" style={{ marginLeft: '10px' }}>
                            <Form.Group>
                                <Form.Label>Téléphone 2</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telephone2"
                                    value={newClient.telephone2}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </div>
                        <div className="flex-fill" style={{ marginLeft: '10px' }}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={newClient.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </div>
                    </div>

                    {/* Row with two fields side by side */}
                    <div className="d-flex mb-3">
                        <div className="flex-fill" style={{ marginLeft: '10px' }}>
                            <Form.Group>
                                <Form.Label>Adresse</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="adresse"
                                    value={newClient.adresse}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </div>
                        <div className="flex-fill" style={{ marginLeft: '10px' }}>
                            <Form.Group>
                                <Form.Label>Code Postal</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cp"
                                    value={newClient.cp}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </div>
                        <div className="flex-fill" style={{ marginLeft: '10px' }}>
                            <Form.Group>
                                <Form.Label>Ville</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cp"
                                    value={newClient.cp}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </div>
                    </div>

                                        {/* Civilité and Siret */}
                    <div className="d-flex mb-3" >
                        <div className="flex-fill" style={{ marginLeft: '10px' }}>
                            <Form.Group>
                                <Form.Label>Civilité</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="civilite"
                                    value={newClient.civilite}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </div>
                        <div className="flex-fill" style={{ marginLeft: '10px' }}>
                            <Form.Group>
                                <Form.Label>Siret</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="siret"
                                    value={newClient.siret}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </div>
                        <div className="flex-fill" style={{ marginLeft: '10px' }}>
                            <Form.Group>
                                <Form.Label>Agent ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="agentId"
                                    value={newClient.agentId}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </div>
                    </div>

                    {/* Statut Dropdown */}
                    <div className="d-flex mb-3 ">
                        <div className="flex-fill" style={{ marginLeft: '10px' }}>
                            <Form.Group>
                                <Form.Label>Statut</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="statut"
                                    value={newClient.statut}
                                    onChange={handleChange}
                                >
                                    <option value="Non statué">Non statué</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Installation">Installation</option>
                                    <option value="Cancelled">Cancelled</option>
                                </Form.Control>
                            </Form.Group>
                        </div>
                        <div className="flex-fill" style={{ marginLeft: '10px' }}>
                            <Form.Group>
                                <Form.Label>Type RDV</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="typeRdv"
                                    value={newClient.typeRdv}
                                    onChange={handleChange}
                                >
                                    <option value="Intérieur">Intérieur</option>
                                    <option value="Extérieur">Extérieur</option>
                                </Form.Control>
                            </Form.Group>
                        </div>
                        <div className="flex-fill" style={{ marginLeft: '10px' }}>
                            <Form.Group>
                                <Form.Label>Date RDV</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dateRdv"
                                    value={newClient.dateRdv}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="d-flex mb-3">
                        <div className="flex-fill" style={{ marginLeft: '10px' }}>
                            <Form.Group>
                                <Form.Label>Commentaire Agent</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="commentaire"
                                    value={newClient.commentaire || ""}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </div>
                        <div className="flex-fill" style={{ marginLeft: '10px' }}>
                            <Form.Group>
                                <Form.Label>Info RDV</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="commentaire"
                                    value={newClient.commentaire || ""}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </div>

                    </div>

                    {/* Commentaire */}

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={handleSubmit}>Add Client</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddClientModal;
