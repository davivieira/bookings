import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';

export type UserState = {
  currentUser: User | null;
}

const initialState: UserState = {
  currentUser: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    resetUser: (state) => {
      state.currentUser = null;
    }
  },
});

export const { setCurrentUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
