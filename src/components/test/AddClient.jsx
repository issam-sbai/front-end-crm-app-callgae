import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const AddClient = ({ show, onHide, onAdd }) => {
    
    const [newClient, setNewClient] = useState({
        civilite: "M.",
        prenom: "",
        entreprise: "",
        phone: "",
        email: "",
        siret: "",
        adresse: "",
        codepostal: "",
        ville: "",
        dateRdv: "",
        typeRdv: "Intérieur",
        agentId: "",
        infoRdv: "",
        commentaire: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewClient({ ...newClient, [name]: value });
    };

    const validateForm = () => {
        const requiredFields = ["civilite", "prenom", "entreprise", "phone", "email", "siret", "adresse", "codepostal", "ville", "dateRdv", "typeRdv", "agentId"];
        for (let field of requiredFields) {
            if (!newClient[field]) {
                return `${field} is required`;
            }
        }
        return "";
    };

    const handleSubmit = () => {
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
    
        // 👉 Get role and equipe from localStorage
        const storedRole = localStorage.getItem("role");
        const storedEquipId = localStorage.getItem("equip");
    
        console.log("Role:", storedRole);
        console.log("Equipe ID:", storedEquipId);
    
        const formData = {
            civilite: newClient.civilite,
            prenom: newClient.prenom,
            entreprise: newClient.entreprise,
            phone: newClient.phone,
            email: newClient.email,
            siret: newClient.siret,
            adresse: newClient.adresse,
            codepostal: newClient.codepostal,
            ville: newClient.ville,
            dateRdv: newClient.dateRdv,
            typeRdv: newClient.typeRdv,
            agentId: newClient.agentId,
            infoRdv: newClient.infoRdv,
            commentaire: newClient.commentaire,
            statusChantier: "NO STATUS",
        };
    
        // 👉 Add equipe only if NOT admin
        if (storedRole !== "admin") {
            formData.equipe = storedEquipId || null;
        }
    
        onAdd(formData);
    
        // Reset form
        setNewClient({
            civilite: "M.",
            prenom: "",
            entreprise: "",
            phone: "",
            email: "",
            siret: "",
            adresse: "",
            codepostal: "",
            ville: "",
            dateRdv: "",
            typeRdv: "Intérieur",
            agentId: "",
            infoRdv: "",
            commentaire: "",
        });
    
        onHide();
    };
    

    return (
        <Modal show={show} onHide={onHide} centered size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Add New Client</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form>
                    <div className="d-flex mb-3">
                        <Form.Group className="flex-fill mx-2">
                            <Form.Label>Civilité</Form.Label>
                            <Form.Control type="text" name="civilite" value={newClient.civilite} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="flex-fill mx-2">
                            <Form.Label>Nom / Prénom</Form.Label>
                            <Form.Control type="text" name="prenom" value={newClient.prenom} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="flex-fill mx-2">
                            <Form.Label>Entreprise</Form.Label>
                            <Form.Control type="text" name="entreprise" value={newClient.entreprise} onChange={handleChange} required />
                        </Form.Group>
                    </div>
                    <div className="d-flex mb-3">
                        <Form.Group className="flex-fill mx-2">
                            <Form.Label>Téléphone</Form.Label>
                            <Form.Control type="text" name="phone" value={newClient.phone} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="flex-fill mx-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={newClient.email} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="flex-fill mx-2">
                            <Form.Label>Siret</Form.Label>
                            <Form.Control type="text" name="siret" value={newClient.siret} onChange={handleChange} required />
                        </Form.Group>
                    </div>
                    <div className="d-flex mb-3">
                        <Form.Group className="flex-fill mx-2">
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control type="text" name="adresse" value={newClient.adresse} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="flex-fill mx-2">
                            <Form.Label>Code Postal</Form.Label>
                            <Form.Control type="text" name="codepostal" value={newClient.codepostal} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="flex-fill mx-2">
                            <Form.Label>Ville</Form.Label>
                            <Form.Control type="text" name="ville" value={newClient.ville} onChange={handleChange} required />
                        </Form.Group>
                    </div>
                    <div className="d-flex mb-3">
                        <Form.Group className="flex-fill mx-2">
                            <Form.Label>Date RDV</Form.Label>
                            <Form.Control type="date" name="dateRdv" value={newClient.dateRdv} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="flex-fill mx-2">
                            <Form.Label>Type RDV</Form.Label>
                            <Form.Control as="select" name="typeRdv" value={newClient.typeRdv} onChange={handleChange}>
                                <option value="Intérieur">Intérieur</option>
                                <option value="Extérieur">Extérieur</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="flex-fill mx-2">
                            <Form.Label>Agent ID</Form.Label>
                            <Form.Control type="text" name="agentId" value={newClient.agentId} onChange={handleChange} required />
                        </Form.Group>
                    </div>
                    <div className="d-flex mb-3">
                        <Form.Group className="flex-fill mx-2">
                            <Form.Label>Commentaire Agent</Form.Label>
                            <Form.Control as="textarea" rows={3} name="commentaire" value={newClient.commentaire} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="flex-fill mx-2">
                            <Form.Label>Info RDV</Form.Label>
                            <Form.Control as="textarea" rows={3} name="infoRdv" value={newClient.infoRdv} onChange={handleChange} />
                        </Form.Group>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={handleSubmit}>Add Client</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddClient;
