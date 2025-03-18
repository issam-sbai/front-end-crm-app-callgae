import React, { useState } from 'react';

const RdvSection = ({ rdvs, handleSave }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(rdvs);

  // Fields to display
  const fieldsToShow = ["statut", "commentaire", "typeRdv", "dateRdv"];

  // Handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRdvs = [...formData];
    updatedRdvs[index] = { ...updatedRdvs[index], [name]: value };
    setFormData(updatedRdvs);
  };

  // Toggle edit mode
  const handleEditClick = () => {
    setEditing(!editing);
  };

  // Save changes
  const handleSaveClick = () => {
    handleSave(formData); // Pass the updated data to the parent component or API
    setEditing(false);
  };

  return (
    <div className="col-lg-8 col-md-12" style={{ marginLeft: '25%' }}>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">RDV Details</h5>
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th style={{ width: '30%' }}>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((rdv, index) => (
                <React.Fragment key={index}>
                  {fieldsToShow.map((key) => (
                    <tr key={key}>
                      <td style={{ textTransform: 'capitalize', fontWeight: '600', color: '#555' }}>
                        {key}
                      </td>
                      <td>
                        {editing ? (
                          <input
                            type="text"
                            name={key}
                            className="form-control"
                            value={rdv[key] || ""}
                            onChange={(e) => handleInputChange(e, index)}
                          />
                        ) : (
                          <p style={{ margin: 0 }}>
                            {rdv[key] || "N/A"}
                          </p>
                        )}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-end mt-3">
            <button
              type="button"
              className={`btn ${editing ? 'btn-success' : 'btn-primary'} me-2`}
              onClick={editing ? handleSaveClick : handleEditClick}
            >
              {editing ? 'Save' : 'Edit'}
            </button>
            {editing && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RdvSection;
