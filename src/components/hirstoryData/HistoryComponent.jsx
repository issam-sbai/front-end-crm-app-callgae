import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistoryLogs } from '../../features/historyDataSlice';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

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

const newValueBody = (rowData) => {
    if (rowData.field === 'statusChantier') {
        const emoji = getStatusEmoji(rowData.newValue);
        return `${emoji} ${rowData.newValue}`;
    }
    return rowData.newValue ?? '';
};

export default function HistoryComponent() {
    const dispatch = useDispatch();
    const { historyLogs, status, error } = useSelector((state) => state.history);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchHistoryLogs());
        }
    }, [dispatch, status]);

    if (status === 'loading') return <div>Loading history...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    return (
        <>
            <h3 className="text mb-4">History Logs</h3>
            <div className="card">
                <DataTable
                    value={historyLogs}
                    paginator
                    rows={10}
                    size="small"
                    tableStyle={{ minWidth: '100%', fontSize: '0.75rem' }}
                >
                    <Column field="clientName" header="Client Name" style={{ width: '15%' }} body={(rowData) => rowData.clientName ?? ''} />
                    <Column field="field" header="Field" style={{ width: '15%' }} body={(rowData) => rowData.field ?? ''} />
                    <Column field="oldValue" header="Old Value" style={{ width: '15%' }} body={(rowData) => rowData.oldValue ?? ''} />
                    <Column
                        field="newValue"
                        header="New Value"
                        style={{ width: '15%' }}
                        body={newValueBody}
                    />
                    <Column
                        field="updatedAt"
                        header="Updated At"
                        body={(rowData) => rowData.updatedAt ? new Date(rowData.updatedAt).toLocaleString() : ''}
                        style={{ width: '20%' }}
                    />
                    <Column field="updatedBy" header="Updated By" style={{ width: '20%' }} body={(rowData) => rowData.updatedBy ?? ''} />
                </DataTable>
            </div>
        </>
    );
}
