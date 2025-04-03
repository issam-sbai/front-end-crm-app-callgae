import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser, getUserById, getAllUsers, updateUser, deleteUser } from '../api/userApi';

// Initial state for user slice
const initialState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  token: null, // Store JWT token here
};

// Async actions
export const registerUserAsync = createAsyncThunk('user/register', async (userData) => {
  const user = await registerUser(userData);
  return user;
});

export const loginUserAsync = createAsyncThunk('user/login', async (credentials) => {
  const userData = await loginUser(credentials);
  return userData;
});

export const getUserByIdAsync = createAsyncThunk('user/getUserById', async () => {
  const user = await getUserById();
  return user;
});

export const getAllUsersAsync = createAsyncThunk('user/getAllUsers', async () => {
  const users = await getAllUsers();
  return users;
});

export const updateUserAsync = createAsyncThunk('user/updateUser', async ({ id, updatedUser }) => {
  const user = await updateUser(id, updatedUser);
  return user;
});

export const deleteUserAsync = createAsyncThunk('user/deleteUser', async (id) => {
  await deleteUser(id);
  return id;
});

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserByIdAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
