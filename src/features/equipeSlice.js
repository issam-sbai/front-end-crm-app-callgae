import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  createEquipe,
  getAllEquipes,
  getEquipeById,
  updateEquipe,
  deleteEquipe,
  getClientsByEquipe
} from '../api/equipeApi';

const initialState = {
  equipes: [],
  currentEquipe: null,  // Add this for storing a single equipe
  status: 'idle',
  error: null,
};

// Async thunk to fetch all equipes
export const fetchEquipes = createAsyncThunk('equipes/fetchEquipes', async () => {
  const response = await getAllEquipes();
  return response.data;
});

// Async thunk to get an equipe by ID
export const fetchEquipeById = createAsyncThunk('equipes/fetchEquipeById', async (id) => {
  const response = await getEquipeById(id);
  return response.data;
});

// Async thunk to create a new equipe
export const addEquipe = createAsyncThunk('equipes/addEquipe', async (equipeData) => {
  const response = await createEquipe(equipeData);
  return response.data;
});

// Async thunk to update an equipe
export const updateEquipeById = createAsyncThunk('equipes/updateEquipeById', async ({ id, equipeData }) => {
  const response = await updateEquipe(id, equipeData);
  return response.data;
});

// Async thunk to delete an equipe
export const removeEquipe = createAsyncThunk('equipes/removeEquipe', async (id) => {
  console.log(id);
  
  await deleteEquipe(id);
  return id;
});

// Async thunk to fetch clients by equipe ID
export const getClientsByEquipeThunk = createAsyncThunk('equipes/getClientsByEquipe', async (equipeId) => {
  const response = await getClientsByEquipe(equipeId);
  return response.data;
});

const equipesSlice = createSlice({
  name: 'equipes',
  initialState,
  reducers: {
    resetEquipe: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch all equipes
      .addCase(fetchEquipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEquipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.equipes = action.payload;
      })
      .addCase(fetchEquipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Fetch equipe by ID
      .addCase(fetchEquipeById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEquipeById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentEquipe = action.payload;
      })
      .addCase(fetchEquipeById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add new equipe
      .addCase(addEquipe.fulfilled, (state, action) => {
        state.equipes.push(action.payload);
      })
      // Remove equipe
      .addCase(removeEquipe.fulfilled, (state, action) => {
        state.equipes = state.equipes.filter((equipe) => equipe._id !== action.payload);
      })
      // Update equipe
      .addCase(updateEquipeById.fulfilled, (state, action) => {
        const index = state.equipes.findIndex((equipe) => equipe._id === action.payload._id);
        if (index !== -1) {
          state.equipes[index] = action.payload; // Update the equipe in the state
        }
      })
      // Get clients by equipe ID
      .addCase(getClientsByEquipeThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getClientsByEquipeThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentEquipe.clients = action.payload;  // Store clients in the currentEquipe
      })
      .addCase(getClientsByEquipeThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetEquipe } = equipesSlice.actions;
export default equipesSlice.reducer;
