import css from './ContactForm.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import shortid from 'shortid';

export function ContactForm() {
  const contacts = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({ name: '', number: '' });

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const formSubmit = (e) => {
    e.preventDefault();

    const { name, number } = userData;

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
    handleReset();
  };

  const handleReset = () => {
    setUserData({ name: '', number: '' });
  };

  return (
    <form className={css.form} onSubmit={formSubmit}>
      <label className={css.label}>
        Name
        <input
          className={css.input}
          value={userData.name}
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={css.label}>
        Phone number
        <input
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={userData.number}
          onChange={handleChange}
          required
        />
      </label>
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
}
