import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistoryLogs } from '../../features/historyDataSlice';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const getStatusEmoji = (status) => {
    switch (status) {
        case 'A RAPPELER': return '🟥';
        case 'NO STATUS': return '◼️';
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

const newValueBody = (rowData) => {
    if (rowData.field === 'statusChantier') {
        const emoji = getStatusEmoji(rowData.newValue);
        return `${emoji} ${rowData.newValue}`;
    }
    return rowData.newValue ?? '';
};

const oldValueBody = (rowData) => {
    if (rowData.field === 'statusChantier') {
        const emoji = getStatusEmoji(rowData.oldValue);
        return `${emoji} ${rowData.oldValue}`;
    }
    return rowData.oldValue ?? '';
};

export default function HistoryComponent() {
    const dispatch = useDispatch();
    const { historyLogs, status, error } = useSelector((state) => state.history);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchHistoryLogs());
        }
    }, [dispatch, status]);

    if (status === 'loading') return <div>Chargement de l'historique...</div>;
    if (status === 'failed') return <div>Erreur : {error}</div>;

    // Flatten changes
    const flatLogs = historyLogs.flatMap((log) =>
        log.changes.map((change) => ({
            ...change,
            clientName: `${log.clientId?.prenom ?? ''} ${log.clientId?.entreprise ?? ''}`,
            updatedAt: log.updatedAt,
            updatedBy: log.updatedBy
        }))
    );

    console.log('🔍 Flat logs:', flatLogs); // Optional: log to console

    return (
        <>
            <h3 className="text mb-4">Données de l'historique</h3>
            <div className="card">
                <DataTable
                    value={flatLogs}
                    paginator
                    rows={10}
                    size="small"
                    tableStyle={{ minWidth: '100%', fontSize: '0.75rem' }}
                >
                    <Column field="clientName" header="Nom du client" style={{ width: '15%' }} />
                    <Column field="field" header="Champ modifié" style={{ width: '15%' }} />
                    <Column field="oldValue" header="Ancienne valeur" style={{ width: '15%' }} body={oldValueBody} />
                    <Column field="newValue" header="Nouvelle valeur" style={{ width: '15%' }} body={newValueBody} />
                    <Column
                        field="updatedAt"
                        header="Date de mise à jour"
                        body={(rowData) => rowData.updatedAt ? new Date(rowData.updatedAt).toLocaleString('fr-FR') : ''}
                        style={{ width: '20%' }}
                    />
                    <Column field="updatedBy" header="Mis à jour par" style={{ width: '20%' }} />
                </DataTable>
            </div>
        </>
    );
}
