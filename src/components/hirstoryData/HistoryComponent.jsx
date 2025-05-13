import React, { useState, useEffect } from 'react';
import axios from 'axios';

const getStatusEmoji = (status) => {
  const map = {
    'A RAPPELER': '🟥',
    'NO STATUS': '◼️',
    'Confirmer': '🟩',
    'NRP': '🟨',
    'INJOIGNABLE': '🟥',
    'A RETRAITER': '🟪',
    'CONFIRMER RÉGIE': '🟨',
    'LEDS SOLAIRES': '🟩',
    'Chantier annuler': '🟥',
    'SAV': '🟧',
    'RENVOYER EQUIPE SUR PLACE': '🟧',
    'RETOURNER RECUPERER LEDS': '🟦',
    'MANQUE PIÈCES': '🟧',
    'LIVRAISON POSTALE': '🟪',
    'Chantier Terminé': '🟦',
    'MANQUES RÉGLETTES': '🟦',
    'MPR': '⬜'
  };
  return map[status] || '⬜';
};

const newValueBody = (rowData) => {
  return rowData.field === 'statusChantier'
    ? `${getStatusEmoji(rowData.newValue)} ${rowData.newValue}`
    : rowData.newValue ?? '';
};

const oldValueBody = (rowData) => {
  return rowData.field === 'statusChantier'
    ? `${getStatusEmoji(rowData.oldValue)} ${rowData.oldValue}`
    : rowData.oldValue ?? '';
};

export default function HistoryComponent() {
  const [historyLogs, setHistoryLogs] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistoryData = async () => {
      setStatus('loading');
      try {
        const response = await axios.get('https://crm-backend-rs8c.onrender.com/api/historyData', {
          params: { page: currentPage }
        });
        setHistoryLogs(response.data.data); // Assumed response structure
        setTotalItems(response.data.totalItems); // Total number of items
        setTotalPages(response.data.totalPages); // Total pages
        setStatus('succeeded');
      } catch (err) {
        setError(err.message);
        setStatus('failed');
      }
    };

    fetchHistoryData();
  }, [currentPage]);

  if (status === 'loading') return <div>Chargement...</div>;
  if (status === 'failed') return <div>Erreur : {error}</div>;

  const flatLogs = Array.isArray(historyLogs)
    ? historyLogs.flatMap((log) =>
        log.changes.map((change) => ({
          ...change,
          clientName: `${log.clientId?.prenom ?? ''} ${log.clientId?.entreprise ?? ''}`,
          updatedAt: log.updatedAt,
          updatedBy: log.updatedBy,
        }))
      )
    : [];

  const onPageChange = (e) => {
    setCurrentPage(e.selected + 1); // Bootstrap pagination starts from 1
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <h3 className="text mb-4">Historique</h3>
      <div className="card">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Nom du client</th>
              <th>Champ modifié</th>
              <th>Ancienne valeur</th>
              <th>Nouvelle valeur</th>
              <th>Date de mise à jour</th>
              <th>Mis à jour par</th>
            </tr>
          </thead>
          <tbody>
            {flatLogs.map((log, index) => (
              <tr key={index}>
                <td>{log.clientName}</td>
                <td>{log.field}</td>
                <td>{oldValueBody(log)}</td>
                <td>{newValueBody(log)}</td>
                <td>{log.updatedAt ? new Date(log.updatedAt).toLocaleString('fr-FR') : ''}</td>
                <td>{log.updatedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handlePrevious}>
                Précédent
              </button>
            </li>
            <li className="page-item disabled">
              <span className="page-link">
                {currentPage} / {totalPages}
              </span>
            </li>
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handleNext}>
                Suivant
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
