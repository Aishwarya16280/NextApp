import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Dummy API endpoint — you can replace with your own
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// User type
export interface User {
  id: number; // add id for dummy api
  name: string;
  email: string;
  role: string;
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  // Transform data to include role (dummy)
  return data.map((user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: 'User', // default role, or randomize
  })) as User[];
});

// Async thunk to add user (POST)
export const addUser = createAsyncThunk(
  'users/addUser',
  async (newUser: Omit<User, 'id'>) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return { ...newUser, id: data.id || Math.floor(Math.random() * 1000) }; // fallback id
  }
);

// Async thunk to update user (PUT)
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (updatedUser: User) => {
    const response = await fetch(`${API_URL}/${updatedUser.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedUser),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data as User;
  }
);

interface UsersState {
  users: User[];
  loading: boolean;
  error?: string;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: undefined,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // optional synchronous reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
      })

      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export default usersSlice.reducer;
