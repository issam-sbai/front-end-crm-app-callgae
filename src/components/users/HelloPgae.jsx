import React from 'react';

const HelloPage = () => {
  const username = localStorage.getItem('username');

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Hello, {username} 👋</h1>
      <p>Welcome back!</p>
    </div>
  );
};

export default HelloPage;