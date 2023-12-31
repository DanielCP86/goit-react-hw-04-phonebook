import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useState, useEffect } from 'react';

const CONTACTS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(CONTACTS_KEY)) ?? []
  );
  const [filter, setFilter] = useState('');

  const onSubmitForm = (name, number) => {
    const contactItem = {
      id: nanoid(),
      name,
      number,
    };

    if (
      contacts
        .map(contact => contact.name.toLowerCase())
        .includes(contactItem.name.toLowerCase())
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }

    setContacts([...contacts, contactItem]);
  };

  const onFiltering = event => {
    setFilter(event.currentTarget.value.toLowerCase());
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  useEffect(() => {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <article>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onSubmitForm} />
      <h2>Contacts</h2>
      <Filter onFilter={onFiltering} />
      <ContactList
        contactItems={getFilteredContacts()}
        deleteContact={deleteContact}
      />
    </article>
  );
};
