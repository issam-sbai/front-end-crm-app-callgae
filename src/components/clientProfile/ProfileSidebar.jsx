import React from 'react';

const ProfileSidebar = ({ clientData }) => (
  <div
    className="col-lg-4 col-md-12"
    style={{
      position: 'fixed',
      top: '100px',
      left: '0',
      width: '25%',
      zIndex: '999',
      height: 'auto'
    }}
  >
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
            <span><b>{clientData.email}</b></span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center p-3">
            <i className="fas fa-phone fa-lg" />
            <span><b>{clientData.telephone}</b></span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center p-3">
            <i className="fas fa-phone-alt fa-lg" />
            <span> <b>{clientData.telephone2}</b></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default ProfileSidebar;
