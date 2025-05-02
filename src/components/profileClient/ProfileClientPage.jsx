import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import './ProfileClientstyle.css';

const ProfileClientPage = () => {
    const { id } = useParams();
    const [clientData, setClientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found — please log in.');

                const response = await fetch(`http://localhost:5000/api/clients/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
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
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            if (!token) throw new Error('No token found — please log in.');

            const {
                prenom, codepostal, phone, civilite, infoRdv, statusChantier, email, adresse,
                ville, siret, dateRdv, typeRdv, agentId, entreprise, commentaire, department,
                flag, updatePar, quantiteDeLed
            } = clientData;

            const updatedClient = {
                prenom, codepostal, phone, civilite, infoRdv, statusChantier, email, adresse,
                ville, siret, dateRdv, typeRdv, agentId, entreprise, commentaire, department,
                flag, quantiteDeLed,
                updatePar: username
            };

            const response = await fetch(`https://crm-backend-rs8c.onrender.com/api/clients/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
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
        prenom = '', codepostal = '', phone = '', flag = '', civilite = '', infoRdv = '', statusChantier = '',
        adresse = '', ville = '', siret = '', updatePar = '',
        dateCreation = '', dateRdv = '', typeRdv = '', agentId = '', entreprise = '', department = '',
        commentaire = '', email = '', quantiteDeLed = ''
    } = clientData || {};

    const enumOptions = {
        flag: ['Aucun(e)', 'PAY', 'NO PAY'],
        typeRdv: ['Extérieur', 'Intérieur'],
        statusChantier: ['A RAPPELER', 'NO STATUS', 'NRP', 'Confirmer', 'Chantier annuler', 'Chantier Terminé'],
    };

    const readOnlyKeys = ['updatePar', 'createdPar', 'dateCreation'];

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
                                        <h4>{entreprise}</h4>
                                        <p className="text-secondary mb-1">Client : {prenom}</p>
                                        <p className="text-muted mb-0">{adresse}</p>
                                        <p className="text-muted">{ville} {codepostal}</p>
                                        <button className="btn btn-primary" onClick={handleEditToggle}>
                                            {isEditing ? 'Cancel Edit' : 'Edit Client'}
                                        </button>
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap" style={{ fontSize: '0.75rem' }}>
                                        <h6 className="mb-0">🪪 siret</h6>
                                        <span className="text-secondary">{siret}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap" style={{ fontSize: '0.75rem' }}>
                                        <h6 className="mb-0">📞 Téléphone</h6>
                                        <span className="text-secondary">{phone}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap" style={{ fontSize: '0.75rem' }}>
                                        <h6 className="mb-0">📧 Email</h6>
                                        <span className="text-secondary">{email}</span>
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
                                    { label: 'Civilité', value: civilite, key: 'civilite' },
                                    { label: 'Nom', value: prenom, key: 'prenom' },
                                    { label: 'Entreprise', value: entreprise, key: 'entreprise' },
                                    { label: 'Type Rdv', value: typeRdv, key: 'typeRdv', enum: enumOptions.typeRdv },
                                    { label: 'Adresse', value: adresse, key: 'adresse' },
                                    { label: 'Ville', value: ville, key: 'ville' },
                                    { label: 'Code Postal', value: codepostal, key: 'codepostal' },
                                    { label: 'Department', value: department, key: 'department' },
                                    { label: 'Téléphone', value: phone, key: 'phone' },                                    
                                    { label: 'Quantité de LED', value: quantiteDeLed, key: 'quantiteDeLed' },
                                    { label: 'Status Chantier', value: statusChantier, key: 'statusChantier', enum: enumOptions.statusChantier },                                    
                                    { label: 'Siret', value: siret, key: 'siret' },
                                    { label: 'Valide Par', value: updatePar, key: 'updatePar' },
                                    { label: 'Created By', value: agentId, key: 'createdPar' },
                                    { label: 'Date Creation', value: dateCreation, key: 'dateCreation' },
                                    { label: 'Date Rdv', value: dateRdv, key: 'dateRdv' },                                                              
                                    { label: 'Commentaire', value: commentaire, key: 'commentaire' },
                                    { label: 'Rdv Info', value: infoRdv, key: 'infoRdv' },
                                ].map((field, i) => (
                                    <div className="row mb-3" key={i}>
                                        <div className="col-sm-3">
                                            <h6 className="mb-0" style={{ fontSize: '0.75rem' }}>{field.label}</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {isEditing && !readOnlyKeys.includes(field.key) ? (
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
                                                        type={field.key === 'quantiteDeLed' ? 'number' : 'text'}
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
                                            Cancel Edit
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
