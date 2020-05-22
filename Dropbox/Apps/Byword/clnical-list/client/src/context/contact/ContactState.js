import React, { useReducer} from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_ALERT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: '練馬　隆',
        email: 'takashi@gmail.com',
        phone: '0311111111',
        type: '発熱，咳以外'
      },
      {
        id: 2,
        name: '杉並　豊',
        email: 'yutaka@gmail.com',
        phone: '0322223333',
        type: '発熱，咳'
      },
      {
        id: 3,
        name: '世田谷　良和',
        email: 'yoshikazu@gmail.com',
        phone: '08013463242',
        type: '発熱，咳以外'
      }
    ]
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add Contact

  // Delete Contact

  // Set Current Contact

  // Clear Current Contact

  // Update Contact

  // Filter Contacts

  // Clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts
      }}
    >
      { props.children}
    </ContactContext.Provider>

  );
};

export default ContactState;