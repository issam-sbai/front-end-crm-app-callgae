import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const ClientHistory = ({ clientId }) => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    axios.get(`https://crm-backend-rs8c.onrender.com/api/historyData/${clientId}`)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        setHistoryData(data);
      })
      .catch(err => {
        console.error(err);
        setHistoryData([]);
      });
  }, [clientId]);

  // Column templates
  const dateBody = (rowData) => (
    new Date(rowData.updatedAt).toLocaleString('fr-FR')
  );

  const operationBody = (rowData) => (
    rowData.changes?.length > 0 ? 'Modification' : 'Ajout'
  );

  const detailsBody = (rowData) => (
    <div className="space-y-1">
      {rowData.changes?.map((change, index) => (
        <div key={index}>
          <strong>{change.field}:</strong> {change.oldValue} → <span className="text-blue-600">{change.newValue}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Historique du client</h2>
      <DataTable
        value={historyData}
        paginator
        rows={5}
        className="p-datatable-sm"
        responsiveLayout="scroll"
        emptyMessage="Aucun historique trouvé"
        stripedRows
      >
        <Column field="updatedAt" header="Date" body={dateBody} />
        <Column field="updatedBy" header="Utilisateur" />
        <Column header="Opération" body={operationBody} />
        <Column header="Détails" body={detailsBody} />
      </DataTable>
    </div>
  );
};

export default ClientHistory;
