import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Select from 'react-select';

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
    'typeRdv', // Include typeRdv here
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

  // Handle change for react-select
  const handleSelectChange = (selectedOption, field) => {
    setFormData((prevData) => ({ ...prevData, [field]: selectedOption.value }));
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
      const result = await Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      });

      if (result.isConfirmed) {
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
        setFormData(clientData);
        setEditing(false);
        Swal.fire('Changes are not saved', '', 'info');
      }
    } catch (err) {
      setError(`Error updating client: ${err.message}`);
    }
  };

  const handleStatusClick = (id, status) => {
    console.log(`Status for ${id} changed to ${status}`);
    // Handle status change here
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Cancelled':
        return '#ff0000'; // Red
      case 'Confirmed':
        return '#26ba12'; // Green
      case 'Installation':
        return '#0000ff'; // Blue
      default:
        return '#cccccc'; // Gray for "Non statué"
    }
  };

  const getRdvTypeColor = (type) => {
    switch (type) {
      case 'Intérieur':
        return '#FFA07A'; // Red for Intérieur
      case 'Extérieur':
        return '#FFD700'; // Blue for Extérieur
      default:
        return '#808080'; // Gray for unknown or other types
    }
  };

  // React-Select options for statut
  const statutOptions = [
    { value: 'Installation', label: 'Installation' },
    { value: 'Confirmed', label: 'Confirmed' },
    { value: 'Cancelled', label: 'Cancelled' },
    { value: 'Non statué', label: 'Non statué' },
  ];

  // React-Select options for typeRdv
  const typeRdvOptions = [
    { value: 'Intérieur', label: 'Intérieur' },
    { value: 'Extérieur', label: 'Extérieur' },
  ];

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
                  key === 'statut' ? (
                    <div className="d-flex align-items-center">
                      <Select
                        name={key}
                        value={statutOptions.find(option => option.value === formData[key])}
                        onChange={(selectedOption) => handleSelectChange(selectedOption, 'statut')}
                        options={statutOptions}
                        className="react-select-container"
                      />
                    </div>
                  ) : key === 'typeRdv' ? (
                    <div className="d-flex align-items-center">
                      <i
                        className="fas fa-circle"
                        style={{
                          backgroundColor: getRdvTypeColor(formData[key]),
                          color: 'white',
                          width: '15px',
                          height: '15px',
                          display: 'inline-block',
                          borderRadius: '50%',
                          marginRight: '10px',
                        }}
                      ></i>
                      <Select
                        name={key}
                        value={typeRdvOptions.find(option => option.value === formData[key])}
                        onChange={(selectedOption) => handleSelectChange(selectedOption, 'typeRdv')}
                        options={typeRdvOptions}
                        className="react-select-container"
                      />
                    </div>
                  ) : (
                    <input
                      type="text"
                      name={key}
                      className="form-control"
                      value={formData[key] || ''}
                      onChange={handleInputChange}
                    />
                  )
                ) : key === 'statut' ? (
                  <div
                    id={`idqc1_${formData.id}`}
                    onClick={() => handleStatusClick(formData.id, formData[key])}
                    style={{ cursor: 'pointer' }}
                  >
                    <i
                      className="fas fa-square"
                      style={{
                        backgroundColor: getStatusColor(formData[key]),
                        color: 'white',
                        width: '15px',
                        height: '15px',
                        display: 'inline-block',
                        borderRadius: '2px',
                      }}
                    ></i>
                    <span style={{ marginLeft: '5px' }}>{formData[key] || 'N/A'}</span>
                  </div>
                ) : key === 'typeRdv' ? (
                  <div className="d-flex align-items-center">
                    <i
                      className="fas fa-circle"
                      style={{
                        backgroundColor: getRdvTypeColor(formData[key]),
                        color: 'white',
                        width: '15px',
                        height: '15px',
                        display: 'inline-block',
                        borderRadius: '50%',
                        marginRight: '10px',
                      }}
                    ></i>
                    <span>{formData[key] || 'N/A'}</span>
                  </div>
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
