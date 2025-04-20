import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllHistory } from '../api/historyDataApi'; // Import the API function

const initialState = {
  historyLogs: [], // To store history logs
  status: 'idle', // To manage loading state
  error: null, // To manage errors
};

// Async thunk to fetch all history logs
export const fetchHistoryLogs = createAsyncThunk('history/fetchHistoryLogs', async () => {
  const response = await getAllHistory(); // Call the API to get history logs
  return response.data;
});

const historyDataSlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    resetHistoryData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistoryLogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHistoryLogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.historyLogs = action.payload; // Save history logs to the Redux state
      })
      .addCase(fetchHistoryLogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Store error message if request fails
      });
  },
});
export const { resetHistoryData } = historyDataSlice.actions;
export default historyDataSlice.reducer;
