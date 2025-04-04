import React from "react";

const ProfileSection = ({ client }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold mb-4">👤 Profil de {client.prenom}</h2>

      {/* Personal Info */}
      <div>
        <h3 className="text-xl font-semibold mb-2">🧍 Informations personnelles</h3>
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Civilité:</strong> {client.civilite}</p>
          <p><strong>Prénom:</strong> {client.prenom}</p>
          <p><strong>Email:</strong> {client.email}</p>
          <p><strong>Téléphone:</strong> {client.phone}</p>
          <p><strong>SIRET:</strong> {client.siret}</p>
        </div>
      </div>

      {/* Address */}
      <div>
        <h3 className="text-xl font-semibold mb-2">📍 Adresse</h3>
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Adresse:</strong> {client.adresse}</p>
          <p><strong>Ville:</strong> {client.ville}</p>
          <p><strong>Code Postal:</strong> {client.codepostal}</p>
          <p><strong>Département:</strong> {client.department}</p>
        </div>
      </div>

      {/* RDV Info */}
      <div>
        <h3 className="text-xl font-semibold mb-2">📅 Rendez-vous</h3>
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Date:</strong> {new Date(client.dateRdv).toLocaleString()}</p>
          <p><strong>Type:</strong> {client.typeRdv}</p>
          <p><strong>Infos:</strong> {client.infoRdv}</p>
          <p><strong>Commentaire:</strong> {client.commentaire}</p>
        </div>
      </div>

      {/* Chantier Info */}
      <div>
        <h3 className="text-xl font-semibold mb-2">🔧 Chantier</h3>
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Statut:</strong> {client.statusChantier}</p>
          <p><strong>Type Dossier:</strong> {client.typeDossier}</p>
          <p><strong>Documents:</strong> {client.documents}</p>
          <p><strong>Audit:</strong> {client.audit}</p>
        </div>
      </div>

      {/* Observations */}
      <div>
        <h3 className="text-xl font-semibold mb-2">📝 Observations</h3>
        <ul className="list-disc list-inside text-gray-700">
          {client.observations.map((obs, index) => (
            <li key={index}>{obs}</li>
          ))}
        </ul>
      </div>

      {/* System Info */}
      <div>
        <h3 className="text-xl font-semibold mb-2">⚙️ Données système</h3>
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Validé par:</strong> {client.validePar}</p>
          <p><strong>Créé par:</strong> {client.createdPar}</p>
          <p><strong>Agent ID:</strong> {client.agentId}</p>
          <p><strong>Entreprise:</strong> {client.entreprise}</p>
          <p><strong>Equipe (ID):</strong> {client.equipe}</p>
          <p><strong>NRP:</strong> {client.nrp}</p>
          <p><strong>Flag:</strong> {client.flag}</p>
          <p><strong>Document:</strong> {client.document}</p>
        </div>
      </div>

      {/* Location */}
      <div>
        <h3 className="text-xl font-semibold mb-2">🗺️ Localisation</h3>
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Latitude:</strong> {client.latitude}</p>
          <p><strong>Longitude:</strong> {client.longitude}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
