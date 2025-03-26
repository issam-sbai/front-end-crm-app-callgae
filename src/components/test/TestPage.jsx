import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterComponenttest from './testFilter';
import TestTable from './TestTable';

const TestPage = () => {
  const [clients, setClients] = useState([]);  // State to store clients data
  const [status, setStatus] = useState('idle');  // State to manage loading status

  // Fetch clients when the component mounts
  useEffect(() => {
    const fetchClientsData = async () => {
      setStatus('loading');
      try {
        const response = await axios.get('http://192.168.100.26:5000/api/clients/');
        setClients(response.data);  // Store the fetched data in clients state
        setStatus('succeeded');
      } catch (error) {
        console.error("Error fetching clients:", error);
        setStatus('failed');
      }
    };

    if (status === 'idle') {  // Run the fetch only when the status is idle
      fetchClientsData();
    }
  }, [status]);  // Runs only when status is 'idle'

  // Loading or error messages
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error fetching clients</div>;
  }

  const handleApplyFilter = (filteredClients) => {
    setClients(filteredClients);  // Update state with the filtered data
  };

  return (
    <>
      <FilterComponenttest data2={clients} onApplyFilter={handleApplyFilter} />
      <br />
      <br />
      <TestTable data={clients} /> {/* Pass clients to TestTable as props */}
    </>
  );
};

export default TestPage;
