import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/dynamic-fields';

// Add a dynamic field
export const addField = async ({ tableName, fieldName, fieldType, defaultValue }) => {
  const response = await axios.post(`${BASE_URL}/add`, {
    tableName,
    fieldName,
    fieldType,
    defaultValue
  });
  return response.data;
};

// Get all dynamic fields (across all tables)
export const getAllFields = async () => {
  const response = await axios.get(BASE_URL);
  return response.data; // returns an array of all field objects
};

// Get fields for a specific table
export const getFieldsByTable = async (tableName) => {
  const response = await axios.get(`${BASE_URL}/${tableName}`);
  return response.data; // returns an array of field objects for that table
};

// Update a dynamic field
export const updateField = async ({ fieldId, fieldName, fieldType, defaultValue }) => {
  const response = await axios.put(`${BASE_URL}/update`, {
    fieldId,
    fieldName,
    fieldType,
    defaultValue
  });
  return response.data;
};

// Delete a dynamic field
export const deleteField = async ({ tableName, fieldName }) => {
  const response = await axios.delete(`${BASE_URL}/delete`, {
    data: { tableName, fieldName }
  });
  return response.data;
};
