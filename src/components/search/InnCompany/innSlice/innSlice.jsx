import { createSlice } from "@reduxjs/toolkit";

export const innSlice = createSlice({
    name: 'inn',
    initialState: {
        value: '',
    },
    reducers: {
        setInn: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setInn } = innSlice.actions;
export default innSlice.reducer;