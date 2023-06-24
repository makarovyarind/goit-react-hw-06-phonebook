import css from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux'
import { deleteContact } from '../../redux/contactsSlice';

export function ContactList() {

  const contacts = useSelector((state) => state.contacts.contacts);
  const filterName = useSelector((state) => state.contacts.filter);
  const dispatch = useDispatch();

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = (contacts, filterName) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterName.toLowerCase()),
    );
  };

  const newContacts = filteredContacts(contacts, filterName);

  return (
    <ul className={css.list}>
      {newContacts.map(({ id, name, number }) => (
        <li className={css.item} key={id}>
          <p className={css.contact}> 
            {name}: {number}
          </p>
          <button 
          type='button'
          onClick={() => handleDeleteContact(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
