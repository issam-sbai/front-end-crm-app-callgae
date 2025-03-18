import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get URL params
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, updateClientById, addClient } from '../../features/clientSlice'; // Import actions
import ProfileSidebar from './ProfileSidebar';
import ProfileForm from './ProfileForm';
import FooterButtons from './FooterButtons';
import RdvSection from './RdvSection';

const ProfilePage = () => {
  const { id } = useParams(); // Get the client ID from the URL
  const dispatch = useDispatch();
  
  // Local state for storing client data, loading, and error
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await fetch(`http://192.168.100.26:5000/api/clients/${id}`);
        if (!response.ok) throw new Error('Client not found');
        const data = await response.json();
        
        // Log the client data for debugging
        console.log('Client Data:', data);

        setClientData(data); // Set fetched client data to state
      } catch (err) {
        setError('Error fetching client: ' + err.message); // Add context to error message
      } finally {
        setLoading(false); // Set loading to false after the fetch completes
      }
    };

    fetchClient(); // Call the fetch function on component mount
  }, [id]); // Re-run the effect when the client ID changes

  // If still loading, display a loading message
  if (loading) return <p>Loading client data...</p>;

  // If there was an error, display the error message
  if (error) return <p>{error}</p>;

  return (
    <section style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <div className="container-fluid py-3" style={{ maxWidth: '100%' }}>
        <div className="row">
          {/* Profile Sidebar */}
          <ProfileSidebar clientData={clientData} />

          {/* Profile Form */}
           <ProfileForm
            clientData={clientData}
          /> 


          {/* RDV Section */}
          {/* <RdvSection rdvs={[clientData]} /> */}
        </div>
      </div>

      {/* Footer Buttons */}
      {/* You can add FooterButtons or any other UI elements here */}
    </section>
  );
};

export default ProfilePage;
