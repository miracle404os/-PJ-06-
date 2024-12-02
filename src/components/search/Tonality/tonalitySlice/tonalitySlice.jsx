import { createSlice } from '@reduxjs/toolkit';

const tonalitySlice = createSlice({
  name: 'tonality',
  initialState: {
    selectedTonality: 'any',
  },
  reducers: {
    setTonality: (state, action) => {
      state.selectedTonality = action.payload;
    },
  },
});

export const { setTonality } = tonalitySlice.actions;
export default tonalitySlice.reducer;