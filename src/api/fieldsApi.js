import axiosInstance from "./axiosInstance.JS";


// Add a dynamic field
export const addField = async ({ tableName, fieldName, fieldType, defaultValue }) => {
  const response = await axiosInstance.post(`dynamic-fields/add`, {
    tableName,
    fieldName,
    fieldType,
    defaultValue
  });
  return response.data;
};

// Get all dynamic fields
export const getAllFields = async () => {
  const response = await axiosInstance.get(`dynamic-fields`);
  return response.data;
};

// Get fields for a specific table
export const getFieldsByTable = async (tableName) => {
  const response = await axiosInstance.get(`dynamic-fields/${tableName}`);
  return response.data;
};

// Update a dynamic field
export const updateField = async ({ fieldId, fieldName, fieldType, defaultValue }) => {
  const response = await axiosInstance.put(`dynamic-fields/update`, {
    fieldId,
    fieldName,
    fieldType,
    defaultValue
  });
  return response.data;
};

// Delete a dynamic field
export const deleteField = async ({ tableName, fieldName }) => {
  const response = await axiosInstance.delete(`dynamic-fields/delete`, {
    data: { tableName, fieldName }
  });
  return response.data;
};
