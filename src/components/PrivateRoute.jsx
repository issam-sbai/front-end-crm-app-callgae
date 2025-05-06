// // src/routes/PrivateRoute.jsx
// import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import axios from 'axios';

// // List of allowed IPs
// const allowedIPs = ['192.168.11.101','192.168.100.70']; // Add more IPs as needed
// // 
// const PrivateRoute = ({ children }) => {
//   const [isAllowed, setIsAllowed] = useState(null);

//   useEffect(() => {
//     const checkAccess = async () => {
//       const token = localStorage.getItem('token');
//       const role = localStorage.getItem('role');

//       if (!token) {
//         setIsAllowed(false);
//         return;
//       }

//       // ✅ Allow access immediately if admin
//       if (role === 'admin') {
//         setIsAllowed(true);
//         return;
//       }

//       // ❌ Check IP only for non-admin users
//       try {
//         const res = await axios.get('http://localhost:5000/api/ip'); // Your backend
//         const userIP = res.data.ip;
//         console.log('User LAN IP:', userIP);

//         // Check if user's IP is in the list of allowed IPs
//         setIsAllowed(allowedIPs.includes(userIP));
//       } catch (err) {
//         console.error('Error fetching local IP:', err);
//         setIsAllowed(false);
//       }
//     };

//     checkAccess();
//   }, []);

//   if (isAllowed === null) {
//     return <p>Checking IP access...</p>;
//   }

//   return isAllowed ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;


// src/routes/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // If there's no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Otherwise, allow access
  return children;
};

export default PrivateRoute;
