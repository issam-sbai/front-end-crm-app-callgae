import React from 'react';
import "primeicons/primeicons.css"; // Import PrimeIcons styles

const RdvCard = ({ apt }) => {
  // Determine background color based on status
  const getCardTitleStyle = (statut) => {
    if (statut === "Chantier Terminé") {
      return { backgroundColor: '#007bff', color: '#fff' }; // Blue
    } else if (statut === "Confirmer") {
      return { backgroundColor: '#28a745', color: '#fff' }; // Green
    }else if (statut === "NO STATUS") {
      return { backgroundColor: '#696969', color: '#fff' }; // Green
    }
    return {}; // Default
  };

  return (
    <div className="card mb-2">
      <div className="card-title" style={getCardTitleStyle(apt.statut)}>
        <div className="d-flex align-items-center gap-2 mb-1" style={{ fontSize: '1rem' }}>
          <i className="pi pi-chart-line p-1" style={{ fontSize: '1rem' }}></i>
          <small>{apt.statut}</small>
        </div>
      </div>

      <div className="card-body p-2">
        {/* Line 1: Title (nomPrenom) */}
        <h6 className="card-title mb-1">{apt.nomPrenom}</h6>

        {/* Line 2: Icon for entreprise */}
        <div className="d-flex align-items-center gap-2 mb-1">
          <i className="pi pi-briefcase p-1" style={{ fontSize: '1rem', color: '#007bff' }}></i>
          <small>{apt.entreprise}</small>
        </div>

        {/* Line 3: Icon for telephone */}
        <div className="d-flex align-items-center gap-2 mb-1">
          <i className="pi pi-phone p-1" style={{ fontSize: '1rem', color: '#007bff' }}></i>
          <small>{apt.telephone}</small>
        </div>

        {/* Line 4: Icon for adresse */}
        <div className="d-flex align-items-center gap-2 mb-1">
          <i className="pi pi-map-marker p-1" style={{ fontSize: '1rem', color: '#6c757d' }}></i>
          <small>{apt.adresse}, {apt.cp}</small>
        </div>

        {/* Line 5: Icon for email */}
        <div className="d-flex align-items-center gap-2 mb-1">
          <i className="pi pi-envelope p-1" style={{ fontSize: '1rem', color: '#007bff' }}></i>
          <small>{apt.email}</small>
        </div>

        {/* Line 6: Icon for status */}
        <div className="d-flex align-items-center gap-2 mb-1">
          <i className="pi pi-chart-line p-1" style={{ fontSize: '1rem', color: '#28a745' }}></i>
          <small>Status: {apt.statut}</small>
        </div>

        {/* Line 7: Icon for commentaire (optional) */}
        {apt.commentaire && (
          <div className="d-flex align-items-center gap-2 mb-1">
            <i className="pi pi-comment p-1" style={{ fontSize: '1rem', color: '#6c757d' }}></i>
            <small>{apt.commentaire}</small>
          </div>
        )}

        {/* Line 8: Icon for type of RDV */}
        <div className="d-flex align-items-center gap-2 mb-1">
          <i className="pi pi-arrow-right-arrow-left p-1" style={{ fontSize: '1rem', color: '#007bff' }}></i>
          <small>Type: {apt.typeRdv}</small>
        </div>
      </div>
    </div>
  );
};

export default RdvCard;
