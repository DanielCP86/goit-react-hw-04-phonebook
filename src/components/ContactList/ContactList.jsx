import { ContactItem } from 'components/ContactItem/ContactItem';
import './ContactList.module.css';
import PropTypes from 'prop-types';

export const ContactList = ({ contactItems, deleteContact }) => (
  <ul>
    {contactItems.map(({ id, name, number }) => {
      return (
        <ContactItem
          key={id}
          id={id}
          name={name}
          number={number}
          deleteContact={deleteContact}
        />
      );
    })}
  </ul>
);

ContactList.propTypes = {
  contactItems: PropTypes.arrayOf(Object).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
