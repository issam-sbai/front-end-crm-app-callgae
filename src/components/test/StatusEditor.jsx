import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchClients, getClientsByEquipeThunk } from '../../features/clientSlice';
import { Toast } from 'primereact/toast';

const StatusEditor = ({ clientId, currentStatus }) => {
    const [status, setStatus] = useState(currentStatus);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const toast = useRef(null);

    const role = localStorage.getItem('role');

    const getStatusColor = (status) => {
        switch (status) {
            case 'A RAPPELER': return '#FF6347';
            case 'NO STATUS': return '#808080';
            case 'Confirmer': return '#26ba12';
            case 'NRP': return '#f1c40f';
            case 'INJOIGNABLE': return '#e74c3c';
            case 'A RETRAITER': return '#8e44ad';
            case 'CONFIRMER RÉGIE': return '#d1b800';
            case 'LEDS SOLAIRES': return '#2ecc71';
            case 'Chantier annuler': return '#c0392b';
            case 'SAV': return '#f39c12';
            case 'RENVOYER EQUIPE SUR PLACE': return '#d35400';
            case 'RETOURNER RECUPERER LEDS': return '#1abc9c';
            case 'MANQUE PIÈCES': return '#e67e22';
            case 'LIVRAISON POSTALE': return '#9b59b6';
            case 'Chantier Terminé': return '#3498db';
            case 'MANQUES RÉGLETTES': return '#16a085';
            case 'MPR': return '#95a5a6';
            default: return '#808080';
        }
    };

    const getStatusEmoji = (status) => {
        switch (status) {
            case 'A RAPPELER': return '🟥';
            case 'NO STATUS': return '⬜';
            case 'Confirmer': return '🟩';
            case 'NRP': return '🟨';
            case 'INJOIGNABLE': return '🟥';
            case 'A RETRAITER': return '🟪';
            case 'CONFIRMER RÉGIE': return '🟨';
            case 'LEDS SOLAIRES': return '🟩';
            case 'Chantier annuler': return '🟥';
            case 'SAV': return '🟧';
            case 'RENVOYER EQUIPE SUR PLACE': return '🟧';
            case 'RETOURNER RECUPERER LEDS': return '🟦';
            case 'MANQUE PIÈCES': return '🟧';
            case 'LIVRAISON POSTALE': return '🟪';
            case 'Chantier Terminé': return '🟦';
            case 'MANQUES RÉGLETTES': return '🟦';
            case 'MPR': return '⬜';
            default: return '⬜';
        }
    };

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        const updatePar = localStorage.getItem('username');
    
        try {
            const response = await fetch(`http://localhost:5000/api/clients/${clientId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    statusChantier: newStatus,
                    updatePar: updatePar
                }),
            });
    
            if (!response.ok) throw new Error('Error updating status');
            const data = await response.json();
            console.log('Client updated:', data);
    
            if (role === 'admin') {
                dispatch(fetchClients());
            } else if (role === 'supervisor') {
                const equipId = localStorage.getItem('equipId');
                if (equipId) dispatch(getClientsByEquipeThunk(equipId));
            }
    
            if (toast.current) {
                toast.current.show({
                    severity: 'success',
                    summary: 'Status Updated',
                    detail: 'Client status has been updated successfully.'
                });
            }
    
            setIsEditing(false);
    
        } catch (err) {
            setError('Error updating status: ' + err.message);
        }
    };
    

    useEffect(() => {
        setStatus(currentStatus);
    }, [currentStatus]);

    return (
        <div>
            <Toast ref={toast} />
            <div>
                {role === 'agent' ? (
                    <div>
                        <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '4px 8px',
                            borderRadius: '8px',
                            backgroundColor: '#f0f0f0',
                            color: '#333',
                            whiteSpace: 'nowrap'
                        }}>
                            <span style={{
                                display: 'inline-block',
                                width: '12px',
                                height: '12px',
                                backgroundColor: getStatusColor(status),
                                borderRadius: '2px'
                            }}></span>
                            {status}
                        </span>
                    </div>
                ) : isEditing ? (
                    <div>
                        <select
                            value={status}
                            onChange={handleStatusChange}
                            style={{
                                padding: '6px 10px',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                backgroundColor: 'transparent',
                                cursor: 'pointer',
                                color: '#333'
                            }}
                        >
                            {[
                                'A RAPPELER', 'NO STATUS', 'Confirmer', 'NRP', 'INJOIGNABLE', 'A RETRAITER',
                                'CONFIRMER RÉGIE', 'LEDS SOLAIRES', 'Chantier annuler', 'SAV',
                                'RENVOYER EQUIPE SUR PLACE', 'RETOURNER RECUPERER LEDS', 'MANQUE PIÈCES',
                                'LIVRAISON POSTALE', 'Chantier Terminé', 'MANQUES RÉGLETTES', 'MPR'
                            ].map(option => (
                                <option
                                    key={option}
                                    value={option}
                                    style={{
                                        backgroundColor: 'transparent',
                                        color: '#333',
                                        padding: '4px'
                                    }}
                                >
                                    {getStatusEmoji(option)} {option}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <div>
                        <span
                            onClick={() => setIsEditing(true)}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '4px 8px',
                                borderRadius: '8px',
                                backgroundColor: '#f0f0f0',
                                cursor: 'pointer',
                                color: '#333',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <span style={{
                                display: 'inline-block',
                                width: '12px',
                                height: '12px',
                                backgroundColor: getStatusColor(status),
                                borderRadius: '2px'
                            }}></span>
                            {status}
                        </span>
                    </div>
                )}
            </div>

            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default StatusEditor;
