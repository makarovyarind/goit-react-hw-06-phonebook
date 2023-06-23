import { createSlice } from '@reduxjs/toolkit';

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: [],
        filter: '',
      },
    reducers: {
        addContact: (state, action) => {
            const { id, name, number } = action.payload;
            state.contacts = [...state.contacts, { id, name, number }];
      },
        deleteContact: (state, action) => {
            const id = action.payload;
            state.contacts = state.contacts.filter(contact => contact.id !== id);
      },
        setFilter: (state, action) => {
            state.filter = action.payload;
      },
    },
  });

  export const { addContact, deleteContact, setFilter } = contactsSlice.actions

  export default contactsSlice.reducer