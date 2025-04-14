import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistoryLogs } from '../../features/historyDataSlice';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function HistoryComponent() {
    const dispatch = useDispatch();
    const { historyLogs, status, error } = useSelector((state) => state.history);
    const [expandedRows, setExpandedRows] = useState([]);

    // Fetch history logs
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchHistoryLogs());
        }
    }, [dispatch, status]);

    // Log data once loaded
    useEffect(() => {
        if (historyLogs.length > 0) {
            console.log("📦 History Logs Data:", historyLogs);
        }
    }, [historyLogs]);

    // Show loading
    if (status === 'loading') {
        return <div>Loading history...</div>;
    }

    // Show error
    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    // Group header template: show client name
    const rowGroupHeaderTemplate = (data) => {
        return (
            <span className="font-bold text-lg ml-2">
                👤 {data.clientName ?? 'Unknown Client'}
            </span>
        );
    };

    // Group footer template: count rows
    const rowGroupFooterTemplate = (data) => {
        const totalChanges = historyLogs.filter(log => log.clientId === data.clientId).length;
        return (
            <td colSpan="6">
                <div className="text-right font-bold pr-4">
                    Total changes for {data.clientName ?? 'Unknown'}: {totalChanges}
                </div>
            </td>
        );
    };

    return (
        <div className="card">
            <h3 className="text-center mb-4">📋 History Logs</h3>

            <DataTable
                value={historyLogs}
                rowGroupMode="subheader"
                groupRowsBy="clientId"
                sortMode="single"
                sortField="clientName"
                sortOrder={1}
                expandableRowGroups
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                rowGroupHeaderTemplate={rowGroupHeaderTemplate}
                rowGroupFooterTemplate={rowGroupFooterTemplate}
                tableStyle={{ minWidth: '70rem' }}
            >
                <Column field="clientName" header="Client Name" style={{ width: '15%' }} body={(rowData) => rowData.clientName ?? ''} />
                <Column field="field" header="Field" style={{ width: '15%' }} body={(rowData) => rowData.field ?? ''} />
                <Column field="oldValue" header="Old Value" style={{ width: '15%' }} body={(rowData) => rowData.oldValue ?? ''} />
                <Column field="newValue" header="New Value" style={{ width: '15%' }} body={(rowData) => rowData.newValue ?? ''} />
                <Column
                    field="updatedAt"
                    header="Updated At"
                    body={(rowData) =>
                        rowData.updatedAt ? new Date(rowData.updatedAt).toLocaleString() : ''
                    }
                    style={{ width: '20%' }}
                />
                <Column field="updatedBy" header="Updated By" style={{ width: '20%' }} body={(rowData) => rowData.updatedBy ?? ''} />
            </DataTable>
        </div>
    );
}
