const Rdv = () => {
    return (
      <div>
        <h2>RDV (Appointments)</h2>
        <p>Manage appointments or meetings here.</p>
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>RDV ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Client</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Time</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>1</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Client 1</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>2025-03-15</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>10:00 AM</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Scheduled</td>
            </tr>
            {/* More RDV rows can be added here */}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Rdv;
  