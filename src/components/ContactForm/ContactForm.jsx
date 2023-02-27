import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormContainer, Input, Button, Label } from './ContactForm.styled';
import { patternName, patternNumber } from '../../utils/patterns';
import { messageForName, messageForNumber } from '../../utils/messages';

export function ContactForm({ dataContacts }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeInput = evt => {
    switch (evt.target.name) {
      case 'name':
        setName(evt.target.value);
        break;
      case 'number':
        setNumber(evt.target.value);
        break;
      default:
        return;
    }
  };

  const resetForm = evt => {
    evt.target.elements.name.value = '';
    evt.target.elements.number.value = '';
    setName('');
    setNumber('');
  };

  const handleFormSubmit = evt => {
    evt.preventDefault();
    dataContacts({ name, number });
    resetForm(evt);
  };

  return (
    <FormContainer onSubmit={handleFormSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          pattern={patternName}
          title={messageForName}
          required
          onChange={handleChangeInput}
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          pattern={patternNumber}
          title={messageForNumber}
          required
          onChange={handleChangeInput}
        />
      </Label>
      <Button type="submit">Add contact</Button>
    </FormContainer>
  );
}
ContactForm.propTypes = {
  dataContacts: PropTypes.func,
};
