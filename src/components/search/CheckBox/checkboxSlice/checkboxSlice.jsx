import { createSlice } from '@reduxjs/toolkit';

const checkboxSlice = createSlice({
  name: 'checkboxes',
  initialState: {
    maxCompleteness: false,
    businessMentions: false,
    mainRole: false,
    riskFactorsOnly: false,
    includeMarketNews: true,
    includeAnnouncements: true,
    includeNewsSummaries: true,
  },
  reducers: {
    toggleCheckbox: (state, action) => {
      const { checkboxName } = action.payload;
      state[checkboxName] = !state[checkboxName];
    },
  },
});

export const { toggleCheckbox } = checkboxSlice.actions;
export default checkboxSlice.reducer;