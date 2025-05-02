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

    const validStatuses = [
        'A RAPPELER',
        'NO STATUS',
        'NRP',
        'Confirmer',
        'Chantier annuler',
        'Chantier Terminé'
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'A RAPPELER': return '#FF6347';
            case 'NO STATUS': return '#808080';
            case 'NRP': return '#f1c40f';
            case 'Confirmer': return '#26ba12';
            case 'Chantier annuler': return '#c0392b';
            case 'Chantier Terminé': return '#3498db';
            default: return '#808080';
        }
    };

    const getStatusEmoji = (status) => {
        switch (status) {
            case 'A RAPPELER': return '🟥';
            case 'NO STATUS': return '⬜';
            case 'NRP': return '🟨';
            case 'Confirmer': return '🟩';
            case 'Chantier annuler': return '🟥';
            case 'Chantier Terminé': return '🟦';
            default: return '⬜';
        }
    };

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        const updatePar = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`https://crm-backend-rs8c.onrender.com/api/clients/${clientId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
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

            toast.current?.show({
                severity: 'success',
                summary: 'Status Updated',
                detail: 'Client status has been updated successfully.'
            });

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
                ) : isEditing ? (
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
                        {validStatuses.map(option => (
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
                ) : (
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
                )}
            </div>

            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default StatusEditor;
