import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Notification } from '../../utils/notification';
import { theme } from '../../utils/theme';
import { Box } from '../Box';
import { WrapperPhonebook, WrapperContacts } from './Phonebook.styled';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactsList } from '../ContactsList/ContactsList';
import { Filter } from '../Filter/Filter';
import { nanoid } from 'nanoid';

export function Phonebook({ initialContacts, initialFilter }) {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? initialContacts
  );
  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = ({ id, name, number }) => {
    const isFindName = contacts.find(contact => contact.name === name);
    if (isFindName) {
      Notification(name);
      return;
    }

    id = nanoid(4);
    setContacts(contacts => (contacts = [...contacts, { id, name, number }]));
  };

  const changeFilter = evt => setFilter(evt.currentTarget.value);

  const normalizedFilter = filter.toLocaleLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLocaleLowerCase().includes(normalizedFilter)
  );

  const removeContact = contactID => {
    setContacts(contacts => contacts.filter(({ id }) => id !== contactID));
  };

  return (
    <WrapperPhonebook>
      <Box pt={4} pb={2} m={0} color={theme.colors.heading} as="h1">
        Phonebook
      </Box>
      <ContactForm dataContacts={addContacts} />
      <Box m={0} mb={3} color={theme.colors.heading} as="h1">
        Contacts
      </Box>
      <Filter value={filter} changeFilter={changeFilter} />
      <WrapperContacts>
        <ContactsList
          contacts={filteredContacts}
          removeContact={removeContact}
        />
      </WrapperContacts>
    </WrapperPhonebook>
  );
}

Phonebook.propTypes = {
  initialContacts: PropTypes.array.isRequired,
  initialFilter: PropTypes.string.isRequired,
};
