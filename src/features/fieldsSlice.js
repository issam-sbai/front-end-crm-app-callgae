import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/fieldsApi';

const initialState = {
  fields: [],       // list of DynamicField objects
  loading: false,
  error: null,
};

// Thunks

// Fetch all fields across all tables
export const fetchAllFields = createAsyncThunk(
  'fields/fetchAll',
  async () => {
    const data = await api.getAllFields();
    return data; // assume API returns array of field objects
  }
);

// Fetch fields for a specific table
export const fetchFieldsByTable = createAsyncThunk(
  'fields/fetchByTable',
  async (tableName) => {
    const data = await api.getFieldsByTable(tableName);
    return data; // array of field objects for that table
  }
);

// Create a new dynamic field
export const createField = createAsyncThunk(
  'fields/create',
  async (fieldData) => {
    const data = await api.addField(fieldData);
    return data; // assume API returns the created field object
  }
);

// Update an existing dynamic field
export const modifyField = createAsyncThunk(
  'fields/modify',
  async (fieldData) => {
    const data = await api.updateField(fieldData);
    return data; // assume API returns the updated field object
  }
);

// Delete a dynamic field
export const removeField = createAsyncThunk(
  'fields/remove',
  async (identifiers) => {
    const data = await api.deleteField(identifiers);
    return identifiers; // return the identifiers so we can filter locally
  }
);

const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    resetField: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchAllFields.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFields.fulfilled, (state, action) => {
        state.loading = false;
        state.fields = action.payload;
      })
      .addCase(fetchAllFields.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch by table
      .addCase(fetchFieldsByTable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFieldsByTable.fulfilled, (state, action) => {
        state.loading = false;
        state.fields = action.payload;
      })
      .addCase(fetchFieldsByTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create
      .addCase(createField.pending, (state) => {
        state.loading = true;
      })
      .addCase(createField.fulfilled, (state, action) => {
        state.loading = false;
        state.fields.push(action.payload);
      })
      .addCase(createField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update
      .addCase(modifyField.pending, (state) => {
        state.loading = true;
      })
      .addCase(modifyField.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.fields.findIndex(f => f._id === action.payload._id);
        if (idx !== -1) state.fields[idx] = action.payload;
      })
      .addCase(modifyField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete
      .addCase(removeField.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeField.fulfilled, (state, action) => {
        state.loading = false;
        const { tableName, fieldName } = action.payload;
        state.fields = state.fields.filter(f => !(f.tableName === tableName && f.fieldName === fieldName));
      })
      .addCase(removeField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { resetField } = fieldsSlice.actions;

export default fieldsSlice.reducer;
