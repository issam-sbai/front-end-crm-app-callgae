import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProfileClientstyle.css';

const ProfileClientPage = () => {
    const { id } = useParams();
    const [clientData, setClientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/clients/${id}`);
                if (!response.ok) throw new Error('Client not found');
                const data = await response.json();
                console.log('Client Data:', data);
                setClientData(data);
            } catch (err) {
                setError('Error fetching client: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClient();
    }, [id]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        try {
            const {
                prenom, codepostal, phone, civilite, infoRdv, statusChantier, email, adresse,
                ville, siret, dateRdv, typeRdv, agentId, entreprise, commentaire, department,
                audit, document, flag, typeDossier
            } = clientData;

            const updatedClient = {
                prenom, codepostal, phone, civilite, infoRdv, statusChantier, email, adresse,
                ville, siret, dateRdv, typeRdv, agentId, entreprise, commentaire, department,
                audit, document, flag, typeDossier
            };

            const response = await fetch(`http://localhost:5000/api/clients/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedClient),
            });

            if (!response.ok) throw new Error('Error updating client data');
            const data = await response.json();
            console.log('Client updated:', data);

            setClientData(data);
            setIsEditing(false);
        } catch (err) {
            setError('Error updating client: ' + err.message);
        }
    };

    if (loading) return <p style={{ fontSize: '0.75rem' }}>Loading client data...</p>;
    if (error) return <p style={{ fontSize: '0.75rem' }}>{error}</p>;

    const {
        prenom = '', codepostal = '', phone = '', flag = '', document = '', civilite = '', audit = '', typeDossier = '',
        infoRdv = '', statusChantier = '', equipe = '', documents = '', observations = [], email = '', adresse = '',
        ville = '', siret = '', nrp = 0, validePar = '', createdPar = '', dateCreation = '', dateRdv = '', typeRdv = '',
        agentId = '', entreprise = '', department = '', commentaire = '', longitude = '', latitude = '',
    } = clientData || {};

    const enumOptions = {
        flag: ['Aucun(e)', 'OK', 'MANQUE CNI', 'MANQUE TAXE FONCIERE', 'MANQUE AVIS', 'DOCUMENTS VALIDES'],
        document: ['Aucun(e)', 'OK', 'MANQUE CNI', 'MANQUE TAXE FONCIERE', 'MANQUE AVIS', 'DOCUMENTS VALIDES'],
        audit: ['Envoyé en VT', 'VT reçu', 'Envoyé en BAO', 'BAO reçu', 'VT à rectifier', 'BAO à rectifier'],
        typeDossier: ['Aucun(e)', '145', 'AMPLEUR', 'Destratificateur', 'ITE', 'ITE + TOITURE', 'LED', 'LED INTERIEUR', 'Réno - ISO', 'Réno - ITE', 'Réno - PAC', 'Réno - PLACO'],
        statusChantier: ['A RAPPELER', 'NO STATUS', 'NRP', 'INJOIGNABLE', 'A RETRAITER', 'LEDS SOLAIRES', 'CONFIRMER RÉGIE', 'Confirmer', 'Chantier annuler', 'SAV', 'RENVOYER EQUIPE SUR PLACE', 'RETOURNER RECUPERER LEDS', 'MANQUE PIÈCES', 'LIVRAISON POSTALE', 'Chantier Terminé', 'MANQUES RÉGLETTES', 'MPR'],
    };

    const readOnlyKeys = ['validePar', 'createdPar', 'dateCreation'];

    return (
        <div className="container">
            <div className="main-body">
                <div className="row">
                    {/* Left Column */}
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body" style={{ fontSize: '0.75rem' }}>
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img
                                        src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                        alt="Client"
                                        className="rounded-circle p-1 bg-primary"
                                        width="110"
                                    />
                                    <div className="mt-3">
                                        <h4>{prenom} {prenom}</h4>
                                        <p className="text-secondary mb-1">Client</p>
                                        <p className="text-muted font-size-sm">{adresse}</p>
                                        <button className="btn btn-primary" onClick={handleEditToggle}>
                                            {isEditing ? 'Cancel Edit' : 'Edit Client'}
                                        </button>
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap" style={{ fontSize: '0.75rem' }}>
                                        <h6 className="mb-0">📧 Email</h6>
                                        <span className="text-secondary">{email}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap" style={{ fontSize: '0.75rem' }}>
                                        <h6 className="mb-0">📞 Téléphone</h6>
                                        <span className="text-secondary">{phone}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-lg-8">
                        <div className="card mb-3">
                            <div className="card-body" style={{ fontSize: '0.75rem' }}>
                                {[
                                    { label: 'Nom', value: prenom, key: 'prenom' },
                                    { label: 'Code Postal', value: codepostal, key: 'codepostal' },
                                    { label: 'Téléphone', value: phone, key: 'phone' },
                                    { label: 'Flag', value: flag, key: 'flag', enum: enumOptions.flag },
                                    { label: 'Document', value: document, key: 'document', enum: enumOptions.document },
                                    { label: 'Civilité', value: civilite, key: 'civilite' },
                                    { label: 'Audit', value: audit, key: 'audit', enum: enumOptions.audit },
                                    { label: 'Type Dossier', value: typeDossier, key: 'typeDossier', enum: enumOptions.typeDossier },
                                    { label: 'Rdv Info', value: infoRdv, key: 'infoRdv' },
                                    { label: 'Status Chantier', value: statusChantier, key: 'statusChantier', enum: enumOptions.statusChantier },
                                    { label: 'Equipe', value: equipe, key: 'equipe' },
                                    { label: 'Adresse', value: adresse, key: 'adresse' },
                                    { label: 'Ville', value: ville, key: 'ville' },
                                    { label: 'Siret', value: siret, key: 'siret' },
                                    { label: 'Valide Par', value: validePar, key: 'validePar' },
                                    { label: 'Created By', value: createdPar, key: 'createdPar' },
                                    { label: 'Date Creation', value: dateCreation, key: 'dateCreation' },
                                    { label: 'Date Rdv', value: dateRdv, key: 'dateRdv' },
                                    { label: 'Type Rdv', value: typeRdv, key: 'typeRdv' },
                                    { label: 'Agent ID', value: agentId, key: 'agentId' },
                                    { label: 'Entreprise', value: entreprise, key: 'entreprise' },
                                    { label: 'Department', value: department, key: 'department' },
                                    { label: 'Commentaire', value: commentaire, key: 'commentaire' },
                                ].map((field, i) => (
                                    <div className="row mb-3" key={i}>
                                        <div className="col-sm-3">
                                            <h6 className="mb-0" style={{ fontSize: '0.75rem' }}>{field.label}</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {(isEditing && !readOnlyKeys.includes(field.key)) ? (
                                                field.enum ? (
                                                    <select
                                                        className="form-control"
                                                        value={field.value}
                                                        onChange={(e) => {
                                                            setClientData({ ...clientData, [field.key]: e.target.value });
                                                        }}
                                                        style={{ fontSize: '0.75rem' }}
                                                    >
                                                        {field.enum.map((option, idx) => (
                                                            <option key={idx} value={option}>{option}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={field.value}
                                                        onChange={(e) => {
                                                            setClientData({ ...clientData, [field.key]: e.target.value });
                                                        }}
                                                        style={{ fontSize: '0.75rem' }}
                                                    />
                                                )
                                            ) : (
                                                <span>{field.value}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {isEditing && (
                                    <>
                                        <button className="btn btn-success mr-2" onClick={handleSave} style={{ fontSize: '0.75rem' }}>
                                            Save Data
                                        </button>
                                        <button className="btn btn-primary mx-2" onClick={handleEditToggle} style={{ fontSize: '0.75rem' }}>
                                            {isEditing ? 'Cancel Edit' : 'Edit Client'}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileClientPage;
