import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  count: number;
}

const initialState: AppState = {
  count: 0,
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    increase: (state) => {
      state.count += 1;
    },
    decrease: (state) => {
      state.count -= 1;
    },
  },
});

export default appSlice.reducer;
export const actions = appSlice.actions;
