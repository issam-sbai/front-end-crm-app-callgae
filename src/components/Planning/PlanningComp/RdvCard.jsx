import React from 'react';
import "primeicons/primeicons.css"; // Import PrimeIcons styles

const RdvCard = ({ apt }) => {
  const getCardTitleStyle = (statut) => {
    if (statut === "Chantier Terminé") {
      return { backgroundColor: '#007bff', color: '#fff' };
    } else if (statut === "Confirmer") {
      return { backgroundColor: '#28a745', color: '#fff' };
    } else if (statut === "NO STATUS") {
      return { backgroundColor: '#696969', color: '#fff' };
    }
    return {};
  };

  return (
    <div className="card mb-2">
      <div className="card-title" style={getCardTitleStyle(apt.statut)}>
        <div className="d-flex align-items-center gap-2 mb-1" style={{ fontSize: '1rem' }}>
          <i className="pi pi-chart-line p-1" style={{ fontSize: '1rem' }}></i>
          <small>{apt.statut ?? 'N/A'}</small>
        </div>
      </div>

      <div className="card-body p-2">
        <h6 className="card-title mb-1">{apt.nomPrenom ?? 'Client inconnu'}</h6>

        <div className="d-flex align-items-center gap-2 mb-1">
          <i className="pi pi-briefcase p-1" style={{ fontSize: '1rem', color: '#007bff' }}></i>
          <small>{apt.entreprise ?? 'N/A'}</small>
        </div>

        <div className="d-flex align-items-center gap-2 mb-1">
          <i className="pi pi-phone p-1" style={{ fontSize: '1rem', color: '#007bff' }}></i>
          <small>{apt.telephone ?? 'N/A'}</small>
        </div>

        <div className="d-flex align-items-center gap-2 mb-1">
          <i className="pi pi-map-marker p-1" style={{ fontSize: '1rem', color: '#6c757d' }}></i>
          <small>{apt.adresse ?? 'Adresse inconnue'}, {apt.cp ?? ''}</small>
        </div>

        <div className="d-flex align-items-center gap-2 mb-1">
          <i className="pi pi-envelope p-1" style={{ fontSize: '1rem', color: '#007bff' }}></i>
          <small>{apt.email ?? 'N/A'}</small>
        </div>

        <div className="d-flex align-items-center gap-2 mb-1">
          <i className="pi pi-chart-line p-1" style={{ fontSize: '1rem', color: '#28a745' }}></i>
          <small>Status: {apt.statut ?? 'N/A'}</small>
        </div>

        {apt.commentaire && (
          <div className="d-flex align-items-center gap-2 mb-1">
            <i className="pi pi-comment p-1" style={{ fontSize: '1rem', color: '#6c757d' }}></i>
            <small>{apt.commentaire}</small>
          </div>
        )}

        <div className="d-flex align-items-center gap-2 mb-1">
          <i className="pi pi-arrow-right-arrow-left p-1" style={{ fontSize: '1rem', color: '#007bff' }}></i>
          <small>Type: {apt.typeRdv ?? 'N/A'}</small>
        </div>
      </div>
    </div>
  );
};

export default RdvCard;
