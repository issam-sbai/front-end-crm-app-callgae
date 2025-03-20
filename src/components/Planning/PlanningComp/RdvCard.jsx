import React from 'react';
import "primeicons/primeicons.css"; // Import PrimeIcons styles

const RdvCard = ({ apt }) => {
  const getTypeIcon = (typeRdv) => {
    if (typeRdv === "Téléphone") return "pi-phone";
    if (typeRdv === "Extérieur") return "pi-map-marker";
    return "pi-building"; // Default icon for "Bureau"
  };

  const getStatusIcon = (status) => {
    return "pi-chart-line"; // Status icon
  };

  return (
    <div className="card mb-2">
      <div className="card-body p-2">
        <h6 className="card-title mb-1">{apt.nomPrenom}</h6>
        <p className="card-text mb-1"><small>{apt.entreprise}</small></p>

        <div className="d-flex align-items-center gap-2 mb-1">
          {/* Phone icon */}
          <i className={`pi ${getTypeIcon(apt.typeRdv)} p-1`} style={{ fontSize: '1rem', color: '#007bff' }}></i>
          <small>{apt.telephone}</small>
        </div>

        <div className="d-flex align-items-center gap-2 mb-1">
          {/* Address icon */}
          <i className="pi pi-map p-1" style={{ fontSize: '1rem', color: '#6c757d' }}></i>
          <small>{apt.adresse}, {apt.cp}</small>
        </div>

        <div className="d-flex align-items-center gap-2 mb-1">
          {/* Email icon */}
          <i className="pi pi-envelope p-1" style={{ fontSize: '1rem', color: '#007bff' }}></i>
          <small>{apt.email}</small>
        </div>

        <div className="d-flex align-items-center gap-2 mb-1">
          {/* Type of RDV icon */}
          <i className={`pi ${getTypeIcon(apt.typeRdv)} p-1`} style={{ fontSize: '1rem', color: '#007bff' }}></i>
          <small>Type: {apt.typeRdv}</small>
        </div>

        <div className="d-flex align-items-center gap-2 mb-1">
          {/* Status icon */}
          <i className={`pi ${getStatusIcon(apt.statut)} p-1`} style={{ fontSize: '1rem', color: '#28a745' }}></i>
          <small>Status: {apt.statut}</small>
        </div>

        {apt.commentaire && 
          <div className="d-flex align-items-center gap-2 mb-1">
            <i className="pi pi-comment p-1" style={{ fontSize: '1rem', color: '#6c757d' }}></i>
            <small>{apt.commentaire}</small>
          </div>
        }
      </div>
    </div>
  );
};

export default RdvCard;
