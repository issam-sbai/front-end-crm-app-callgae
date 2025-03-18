import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ProfileForm = ({ clientData }) => {
  const clientKeys = [
    'nomPrenom',
    'entreprise',
    'telephone',
    'adresse',
    'cp',
    'email',
    'agentId',
    'civilite',
    'telephone2',
    'statut',
    'commentaire',
    'typeRdv',
    'dateRdv',
  ];

  const [formData, setFormData] = useState(clientData);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  const userRole = localStorage.getItem("role"); // Assuming role is stored in localStorage

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Toggle edit mode
  const handleEditClick = () => {
    setEditing(true);
    setError(null);
  };

  // Cancel editing and revert to original data
  const handleCancelClick = () => {
    setFormData(clientData);
    setEditing(false);
    setError(null);
  };

  // Save changes: update data via API and then exit edit mode
  const handleSaveClick = async () => {
    try {
      // Display confirmation dialog
      const result = await Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      });

      if (result.isConfirmed) {
        // Proceed with saving the data
        const clientId = formData.id || formData._id;
        const response = await fetch(`http://192.168.100.26:5000/api/clients/${clientId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Failed to update client');
        const updatedData = await response.json();
        setFormData(updatedData);
        setEditing(false);
        Swal.fire('Saved!', '', 'success');
      } else if (result.isDenied) {
        // Revert changes if not saved
        setFormData(clientData);
        setEditing(false);
        Swal.fire('Changes are not saved', '', 'info');
      }
    } catch (err) {
      setError(`Error updating client: ${err.message}`);
    }
  };

  return (
    <div className="col-lg-8 col-md-12" style={{ marginLeft: '25%' }}>
      <div className="card mb-4">
        <div className="card-body">
          {clientKeys.map((key) => (
            <div key={key} className="row mb-3" style={{ paddingBottom: '5px', margin: '10px' }}>
              <div className="col-sm-3">
                <label style={{ textTransform: 'capitalize', color: 'rgb(87, 136, 201)' }}>
                  <b>{key}</b>
                </label>
              </div>
              <div className="col-sm-9">
                {editing ? (
                  <input
                    type="text"
                    name={key}
                    className="form-control"
                    value={formData[key] || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p
                    style={{
                      margin: 0,
                      borderBottom: '2px solid rgb(142, 181, 232)',
                      paddingBottom: '3px',
                    }}
                  >
                    {formData[key] || 'N/A'}
                  </p>
                )}
              </div>
            </div>
          ))}

          {error && <div className="alert alert-danger">{error}</div>}

          {/* Only show the buttons if the role is not 'agent' */}
          {userRole !== 'agent' && (
            <div className="d-flex justify-content-end mt-3">
              {editing ? (
                <>
                  <button className="btn btn-success me-2" onClick={handleSaveClick}>
                    Save
                  </button>
                  <button className="btn btn-danger" onClick={handleCancelClick}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="btn btn-primary" onClick={handleEditClick}>
                  Edit
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
