import axios from 'axios';

const API_URL = 'https://your-api-endpoint.com/users';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch users
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await api.get('/');
  return response.data;
});

// Add user
export const addUser = createAsyncThunk('user/addUser', async (newUser) => {
  const response = await api.post('/', newUser);
  return response.data;
});

// Update user
export const updateUser = createAsyncThunk('user/updateUser', async (updatedUser) => {
  const response = await api.put(`/${updatedUser.id}`, updatedUser);
  return response.data;
});

// Delete user
export const deleteUser = createAsyncThunk('user/deleteUser', async (id) => {
  await api.delete(`/${id}`);
  return id;
});
