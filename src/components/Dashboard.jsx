const Dashboard = () => {
    return (
      <div>
        <h2>Dashboard</h2>
        <p>Welcome to your CRM Dashboard!</p>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
          <div style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '5px', width: '30%' }}>
            <h3>Total Clients</h3>
            <p>100</p>
          </div>
          <div style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '5px', width: '30%' }}>
            <h3>Total Users</h3>
            <p>50</p>
          </div>
          <div style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '5px', width: '30%' }}>
            <h3>Upcoming RDVs</h3>
            <p>5</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  