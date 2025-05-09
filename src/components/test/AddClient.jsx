import React, { useState } from "react";
import { Offcanvas, Button, Form, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import PappersSearch from "./PappersSearch";

const AddClient = ({ show, onHide, onAdd }) => {

    const { users, loading: userLoading, error: userError } = useSelector((state) => state.user);

    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

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
        agentId: storedRole === "agent" ? storedUsername : "",
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
            infoRdv: newClient.infoRdv || "...",
            commentaire: newClient.commentaire || "...",
            statusChantier: "NO STATUS",
        };

        if (storedRole !== "admin") {
            formData.equipe = localStorage.getItem("equipId") || null;
        }

        onAdd(formData);

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
            agentId: storedRole === "agent" ? storedUsername : "",
            infoRdv: "",
            commentaire: ""
        });

        onHide();
    };

    return (
        <Offcanvas
            show={show}
            onHide={onHide}
            placement="end"
            backdrop={false}
            style={{ width: '700px', backgroundColor: '#DCDCDC' }}
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Add New Client</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body style={{ padding: 0 }}>
                {error && <Alert variant="danger">{error}</Alert>}
                {userError && <Alert variant="danger">Error loading agents</Alert>}
                <Form>

                    <Form.Group className="mx-2 mb-3">
                        <Form.Label>Recherche Entreprise</Form.Label>
                        <PappersSearch
                            onSelectEntreprise={(data) =>
                                setNewClient((prev) => ({ ...prev, ...data }))
                            }
                        />
                    </Form.Group>
                    {/* <Form.Group className="mx-2 mb-3">
                        <Form.Label>Civilité</Form.Label>
                        <Form.Control
                            type="text"
                            name="civilite"
                            value={newClient.civilite}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group> */}
                    <Form.Group className="mx-2 mb-3">
                        <Form.Label>Civilité</Form.Label>
                        <Form.Control
                            as="select"
                            name="civilite"
                            value={newClient.civilite}
                            onChange={handleChange}
                        >
                            <option value="M.">M.</option>
                            <option value="Mme">Mme</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mx-2 mb-3">
                        <Form.Label>Nom / Prénom</Form.Label>
                        <Form.Control
                            type="text"
                            name="prenom"
                            value={newClient.prenom}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mx-2 mb-3">
                        <Form.Label>Entreprise</Form.Label>
                        <Form.Control
                            type="text"
                            name="entreprise"
                            value={newClient.entreprise}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mx-2 mb-3">
                        <Form.Label>Téléphone</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={newClient.phone}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mx-2 mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={newClient.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mx-2 mb-3">
                        <Form.Label>Siret</Form.Label>
                        <Form.Control
                            type="text"
                            name="siret"
                            value={newClient.siret}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mx-2 mb-3">
                        <Form.Label>Adresse</Form.Label>
                        <Form.Control
                            type="text"
                            name="adresse"
                            value={newClient.adresse}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mx-2 mb-3">
                        <Form.Label>Code Postal</Form.Label>
                        <Form.Control
                            type="text"
                            name="codepostal"
                            value={newClient.codepostal}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mx-2 mb-3">
                        <Form.Label>Ville</Form.Label>
                        <Form.Control
                            type="text"
                            name="ville"
                            value={newClient.ville}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mx-2 mb-3">
                        <Form.Label>Date RDV</Form.Label>
                        <Form.Control
                            type="date"
                            name="dateRdv"
                            value={newClient.dateRdv}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mx-2 mb-3">
                        <Form.Label>Type RDV</Form.Label>
                        <Form.Control
                            as="select"
                            name="typeRdv"
                            value={newClient.typeRdv}
                            onChange={handleChange}
                        >
                            <option value="Intérieur">Intérieur</option>
                            <option value="Extérieur">Extérieur</option>
                            <option value="Intérieur et Extérieur">Intérieur et Extérieur</option>
                        </Form.Control>
                    </Form.Group>

                    {/* Agent Dropdown (hidden for agent role) */}
                    {storedRole !== "agent" && (
                        <Form.Group className="mx-2 mb-3">
                            <Form.Label>Agent</Form.Label>
                            <Form.Control
                                as="select"
                                name="agentId"
                                value={newClient.agentId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">-- Sélectionner un Agent --</option>
                                {userLoading ? (
                                    <option disabled>Chargement...</option>
                                ) : (
                                    users && users
                                        .filter(user => user.role === "agent")
                                        .map(agent => (
                                            <option key={agent._id} value={agent.username}>
                                                {agent.username}
                                            </option>
                                        ))
                                )}
                            </Form.Control>
                        </Form.Group>
                    )}

                    <Form.Group className="mx-2 mb-3">
                        <Form.Label>Commentaire Agent</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="commentaire"
                            value={newClient.commentaire}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mx-2 mb-3">
                        <Form.Label>Info RDV</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="infoRdv"
                            value={newClient.infoRdv}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Form>

                <div className="d-flex justify-content-start align-items-center mt-3 mb-3">
                    <Button className="mx-2" variant="secondary" onClick={onHide}>Close</Button>
                    <Button className="mx-2" variant="primary" onClick={handleSubmit}>Add Client</Button>
                </div>

            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default AddClient;
