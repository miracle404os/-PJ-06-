import { createSlice } from "@reduxjs/toolkit";

export const documentSlice = createSlice({
    name: 'document',
    initialState: {
        value: '',
    },
    reducers: {
        setDocumentCount: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setDocumentCount } = documentSlice.actions;
export default documentSlice.reducer;