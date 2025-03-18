import axios from 'axios';

const API_URL = 'https://your-api-endpoint.com/groups';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch groups
export const fetchGroups = createAsyncThunk('group/fetchGroups', async () => {
  const response = await api.get('/');
  return response.data;
});

// Add group
export const addGroup = createAsyncThunk('group/addGroup', async (newGroup) => {
  const response = await api.post('/', newGroup);
  return response.data;
});

// Update group
export const updateGroup = createAsyncThunk('group/updateGroup', async (updatedGroup) => {
  const response = await api.put(`/${updatedGroup.id}`, updatedGroup);
  return response.data;
});

// Delete group
export const deleteGroup = createAsyncThunk('group/deleteGroup', async (id) => {
  await api.delete(`/${id}`);
  return id;
});
