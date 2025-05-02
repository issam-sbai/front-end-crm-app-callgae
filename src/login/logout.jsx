import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session data from localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("role");
 
    
    
    // Redirect to the login page
    navigate("/");
  }, [navigate]);

  return null; // No need to render anything
};

export default Logout;
