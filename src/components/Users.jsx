const Users = () => {
    return (
      <div>
        <h2>Users</h2>
        <p>Manage the users in your system here.</p>
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>User ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>1</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Admin</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>admin@example.com</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Administrator</td>
            </tr>
            {/* More user rows can be added here */}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Users;
  