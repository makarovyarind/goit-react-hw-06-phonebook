import shortid from 'shortid';
import { useSelector, useDispatch } from 'react-redux'
import { addContact, deleteContact, setFilter } from '../redux/contactsSlice';
// import { persistor } from '../redux/store';
import { Container } from "./Container/Container";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export function App() {
  const contacts = useSelector((state) => state.contacts.contacts);
  console.log(contacts);
  const filterName = useSelector((state) => state.contacts.filter);
  console.log(filterName);
  const dispatch = useDispatch();

  const changeFilter = (e) => {
    dispatch(setFilter(e.currentTarget.value));
  };

  const filteredContacts = (contacts, filterName) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterName.toLowerCase()),
    );
  };

  const formSubmit = ({ name, number }) => {
    if (contacts.find((contact) => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    dispatch(addContact(newContact));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  // const cleanContacts = () => {
  //   persistor.purge();
  // }

  const newContacts = filteredContacts(contacts, filterName);

  return (
    <Container>
      <h2>Phonebook</h2>
      <ContactForm onSubmit={formSubmit} />
      <h2>Contacts</h2>
      {/* <button type='button' onClick={cleanContacts}>Очистити усі контакти</button> */}
      <Filter value={filterName} onChange={changeFilter} />
      {contacts.length === 0 ? (
      <p>Your phonebook is empty. Please add a contact.</p>
    ) : (
      <ContactList contacts={newContacts} onClick={handleDeleteContact} />
    )}
    </Container>
  );
}
