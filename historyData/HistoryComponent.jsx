import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistoryLogs } from '../src/features/historyDataSlice'; // Import the action

const HistoryComponent = () => {
    const dispatch = useDispatch();
    
    // Select history data and loading state from Redux store
    const { historyLogs, status, error } = useSelector((state) => state.history);
  
    // Fetch history data when the component mounts
    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchHistoryLogs());
      }
    }, [dispatch, status]);
  
    // Handle loading, error, and data display
    if (status === 'loading') {
      return <div>Loading history...</div>;
    }
  
    if (status === 'failed') {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">History Logs</h2>
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Client Name</th>
              <th>Field</th>
              <th>Old Value</th>
              <th>New Value</th>
              <th>Updated At</th>
              <th>Updated By</th>
            </tr>
          </thead>
          <tbody>
          {historyLogs.map((log, index) => (
            <tr key={`${log.clientId}_${index}`}>
              <td>{log.clientName}</td>
              <td>{log.field}</td>
              <td>{log.oldValue}</td>
              <td>{log.newValue}</td>
              <td>{new Date(log.updatedAt).toLocaleString()}</td>
              <td>{log.updatedBy}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default HistoryComponent;