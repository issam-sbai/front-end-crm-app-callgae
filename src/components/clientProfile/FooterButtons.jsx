import React from 'react';

const FooterButtons = ({ changesCount, handleSave, handleCancel }) => (
  <div
    style={{
      position: 'fixed',
      bottom: '0',
      left: '0',
      width: '100%',
      backgroundColor: '#fff',
      boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.1)',
      zIndex: '1000',
      padding: '10px 20px'
    }}
  >
    <div className="d-flex justify-content-between">
      <div>
        {changesCount > 0 && (
          <span>
            {changesCount} field{changesCount > 1 ? 's' : ''} have been modified.
          </span>
        )}
      </div>
      <div>
        <button className="btn btn-success" onClick={handleSave}>
          Save Changes
        </button>
        <button className="btn btn-secondary ms-2" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default FooterButtons;
