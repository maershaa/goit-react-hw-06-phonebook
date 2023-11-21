import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './Contacts/ContactsList';
import Filter from './Filter/Filter';
import css from './App.module.css';
import { addContact, deleteContact, filterContact } from 'redux/reducer';

const App = () => {
  // Локальное состояние для отслеживания активной вкладки
  const [activeTab, setActiveTab] = useState('form');

  // Получение функции dispatch для отправки действий в Redux Store
  const dispatch = useDispatch();

  // Получение контактов и фильтра из хранилища Redux
  const contacts = useSelector(state => state.contactsStore.contacts);
  const filter = useSelector(state => state.contactsStore.filter);

  // Функция для изменения активной вкладки
  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  // Функция для добавления нового контакта
  const handleAddContact = newContact => {
    const normalizeName = newContact.name.toLowerCase();
    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === normalizeName
    );

    if (isDuplicate) {
      alert(`${newContact.name} уже есть в контактах`);
      return;
    }

    // Отправка действия для добавления контакта с помощью Redux Toolkit
    dispatch(addContact(newContact));
  };

  // Функция для удаления контакта по его ID
  const handleDeleteContact = contactId => {
    // Отправка действия для удаления контакта с помощью Redux Toolkit
    dispatch(deleteContact(contactId));
  };

  // Функция для обновления фильтра поиска контактов
  const handleFilterChange = newFilterValue => {
    // Отправка действия для обновления фильтра с помощью Redux Toolkit
    dispatch(filterContact(newFilterValue));
  };

  // Функция для фильтрации контактов в соответствии с текущим фильтром
  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>

      {/* Компоненты для переключения между вкладками */}
      <div className={css.tabs}>
        {/* Кнопка для переключения на форму добавления контакта */}
        <button
          onClick={() => handleTabChange('form')}
          className={activeTab === 'form' ? css.activeTab : ''}
        >
          Contact Form
        </button>

        {/* Кнопка для переключения на фильтр и список контактов */}
        <button
          onClick={() => handleTabChange('list')}
          className={activeTab === 'list' ? css.activeTab : ''}
        >
          Contact List
        </button>
      </div>

      {/* Контент соответствующей вкладки */}
      <div className={css.tabContent}>
        {/* Если активная вкладка - форма добавления контакта */}
        {activeTab === 'form' && <ContactForm onSubmit={handleAddContact} />}

        {/* Если активная вкладка - список контактов */}
        {activeTab === 'list' && (
          <div className={css.contactsAndSearchWrapper}>
            <Filter value={filter} onChange={handleFilterChange} />
            <ContactList
              contacts={getFilteredContacts()}
              onDeleteContact={handleDeleteContact}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
