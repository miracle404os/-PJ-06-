import authReducer from '../slice/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import tonalityReducer from '../../search/Tonality/tonalitySlice/tonalitySlice';
import innReducer from '../../search/InnCompany/innSlice/innSlice';
import dateReducer from '../../search/Date/dateSlice/dateSlice';
import documentReducer from '../../search/DocumentCount/documentSlice/documentSlice';
import checkboxReducer from '../../search/CheckBox/checkboxSlice/checkboxSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    inn: innReducer,
    tonality: tonalityReducer,
    document: documentReducer,
    date: dateReducer,
    checkboxes: checkboxReducer,
  },
});

export default store;
