import React, { useState, useEffect } from 'react';

export default function ProfilePage() {
  const originalData = {
    idRdv: "R001",
    nomPrenom: "John Doe",
    entreprise: "ABC Ltd.",
    telephone: "555-987-6543",
    adresse: "123 Main St.",
    cp: "75001",
    email: "john.doe@example.com",
    agentId: "A1",
    dateRdv: "2025-03-20",
    typeRdv: "Extérieur",
    commentaire: "No comments",
    siret: "123456789",
    statut: "Confirmed",
    civilite: "M.",
    telephone2: "555-222-3333",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState(null); // To track which field is being edited
  const [clientData, setClientData] = useState(originalData);
  const [changesCount, setChangesCount] = useState(0); // Track the number of changes

  // Function to track changes
  useEffect(() => {
    let changes = 0;
    for (let key in clientData) {
      if (clientData[key] !== originalData[key]) {
        changes += 1;
      }
    }
    setChangesCount(changes);
  }, [clientData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData({
      ...clientData,
      [name]: value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    setEditingField(null); // Reset the editing field when save is clicked
    // console.log('Client Data Saved', clientData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingField(null); // Reset the editing field
    setClientData(originalData); // Revert to the original data
  };

  const handleEditClick = (field) => {
    setEditingField(field); // Set which field to edit
    setIsEditing(true); // Enable editing mode
  };

  return (
    <section style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <div className="container-fluid py-3" style={{ maxWidth: '100%' }}>
        <div className="row">
          {/* Profile Sidebar */}
          <div className="col-lg-4 col-md-12" style={{
            position: 'fixed',
            top: '100px',
            left: '0',
            width: '25%',
            zIndex: '999',
            height: 'auto'
          }}>
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                />
                <p className="text-muted mb-1">Full Stack Developer</p>
                <p className="text-muted mb-4">{clientData.entreprise}</p>
              </div>
            </div>

            <div className="card mb-4 mb-lg-0">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fas fa-globe fa-lg text-warning" />
                    <span>{clientData.email}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fas fa-phone fa-lg" />
                    <span>{clientData.telephone}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fas fa-phone-alt fa-lg" />
                    <span>{clientData.telephone2}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="col-lg-8 col-md-12" style={{ marginLeft: '25%' }}>
            <div className="card mb-4">
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <label>Full Name</label>
                  </div>
                  <div className="col-sm-9">
                    {editingField === 'nomPrenom' ? (
                      <input
                        type="text"
                        name="nomPrenom"
                        className="form-control"
                        value={clientData.nomPrenom}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p onClick={() => handleEditClick('nomPrenom')}>{clientData.nomPrenom}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <label>Email</label>
                  </div>
                  <div className="col-sm-9">
                    {editingField === 'email' ? (
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={clientData.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p onClick={() => handleEditClick('email')}>{clientData.email}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <label>Phone</label>
                  </div>
                  <div className="col-sm-9">
                    {editingField === 'telephone' ? (
                      <input
                        type="text"
                        name="telephone"
                        className="form-control"
                        value={clientData.telephone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p onClick={() => handleEditClick('telephone')}>{clientData.telephone}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <label>Mobile</label>
                  </div>
                  <div className="col-sm-9">
                    {editingField === 'telephone2' ? (
                      <input
                        type="text"
                        name="telephone2"
                        className="form-control"
                        value={clientData.telephone2}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p onClick={() => handleEditClick('telephone2')}>{clientData.telephone2}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <label>Address</label>
                  </div>
                  <div className="col-sm-9">
                    {editingField === 'adresse' ? (
                      <input
                        type="text"
                        name="adresse"
                        className="form-control"
                        value={clientData.adresse}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p onClick={() => handleEditClick('adresse')}>{clientData.adresse}</p>
                    )}
                  </div>
                </div>
                <hr />

                {/* Display number of changes */}
            
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with fixed buttons */}
      {isEditing && (
        <div style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          width: '100%',
          backgroundColor: '#fff',
          boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.1)',
          zIndex: '1000',
          padding: '10px 20px',
        }}>
          <div className="d-flex justify-content-between">
            <div>
              {changesCount > 0 && (
                <span>{changesCount} field{changesCount > 1 ? 's' : ''} have been modified.</span>
              )}
            </div>
            <div>
              <button className="btn btn-success" onClick={handleSave}>Save Changes</button>
              <button className="btn btn-secondary ms-2" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
