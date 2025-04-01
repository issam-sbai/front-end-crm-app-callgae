import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  createClient, 
  getClients, 
  getClientById, 
  updateClient, 
  deleteClient, 
  getClientsByAgentId, 
  filterClients,
  updateClientNRP as updateClientNRPApi // Renamed the imported updateClientNRP to avoid conflict
} from '../api/clientApi';

const initialState = {
  clientsx: [],
  currentClient: null,  // Add this for storing a single client
  status: 'idle',
  error: null,
};

// Async thunk to fetch clients
export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
  const response = await getClients();
  return response.data;
});

// Async thunk to get a client by ID
export const fetchClientById = createAsyncThunk('clients/fetchClientById', async (id) => {
  const response = await getClientById(id);  // Assume this function fetches a single client by ID
  return response.data;
});

// Async thunk to update a client
export const updateClientById = createAsyncThunk('clients/updateClientById', async ({ id, clientData }) => {
  const response = await updateClient(id, clientData); // update the client in the API
  return response.data; // return updated client data
});

// Create client
export const addClient = createAsyncThunk('clients/addClient', async (clientData) => {
  const response = await createClient(clientData);
  return response.data;
});

// Fetch clients by agent ID
export const fetchClientsByAgentId = createAsyncThunk(
  'clients/fetchClientsByAgentId',
  async (agentId) => {
    const response = await getClientsByAgentId(agentId);
    return response.data;
  }
);

// Delete client
export const removeClient = createAsyncThunk('clients/removeClient', async (id) => {
  await deleteClient(id);
  return id;
});

// Filter clients based on criteria
export const filterClientsByCriteria = createAsyncThunk(
  'clients/filterClientsByCriteria',
  async (filterData) => {
    const response = await filterClients(filterData); // Call the API for filtering
    return response.data;
  }
);

// New async thunk to update the NRP of a client
export const updateClientNRP = createAsyncThunk(
  'clients/updateClientNRP',
  async ({ id, nrpData }) => {
    // Ensure nrpData is correctly structured with 'nrp' key
    const formattedData = { nrp: Number(nrpData) }; // Converting nrpData to a number and wrapping in the object
    
    // Call the API to update the client NRP
    const response = await updateClientNRPApi(id, formattedData);
    
    // Return the updated client data from the response
    return response.data;
  }
);


const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clientsx = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchClientById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClientById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentClient = action.payload; // Store the fetched client in `currentClient`
      })
      .addCase(fetchClientById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.clientsx.push(action.payload);
      })
      .addCase(removeClient.fulfilled, (state, action) => {
        state.clientsx = state.clientsx.filter((client) => client._id !== action.payload);
      })
      .addCase(updateClientById.fulfilled, (state, action) => {
        const index = state.clientsx.findIndex((client) => client._id === action.payload._id);
        if (index !== -1) {
          state.clientsx[index] = action.payload; // Update the client in the state
        }
      })
      .addCase(fetchClientsByAgentId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClientsByAgentId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clientsx = action.payload;
      })
      .addCase(fetchClientsByAgentId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(filterClientsByCriteria.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(filterClientsByCriteria.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clientsx = action.payload; // Store filtered clients
      })
      .addCase(filterClientsByCriteria.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;  
      })
      .addCase(updateClientNRP.pending, (state) => {
        state.status = 'loading'; // Set status to loading while the update is happening
      })
      .addCase(updateClientNRP.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Set status to succeeded when NRP is updated
        const index = state.clientsx.findIndex(client => client._id === action.payload._id);
        if (index !== -1) {
          state.clientsx[index] = action.payload; // Update the client in the state
        }
      })
      .addCase(updateClientNRP.rejected, (state, action) => {
        state.status = 'failed'; // Set status to failed if there's an error
        state.error = action.error.message; // Store the error message
      });
  },
});

export default clientsSlice.reducer;
