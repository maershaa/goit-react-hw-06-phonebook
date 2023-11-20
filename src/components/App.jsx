// Импорт библиотек и компонентов React
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Импорт хуков React Redux для работы с состоянием Redux
// Импорт компонентов приложения

import ContactForm from './ContactForm/ContactForm'; // Компонент формы для добавления контактов
import ContactList from './Contacts/ContactsList'; // Компонент списка контактов
import Filter from './Filter/Filter'; // Компонент фильтра для поиска контактов
import css from './App.module.css'; // Стили приложения
import { addContact, deleteContact, filterContact } from 'redux/reducer';

// Основной компонент приложения
const App = () => {
  const dispatch = useDispatch(); // Получение функции dispatch для отправки действий в Redux Store
  const contacts = useSelector(state => state.contactsStore.contacts); // Получение контактов из хранилища Redux
  console.log('contacts', contacts);
  const filter = useSelector(state => state.contactsStore.filter); // Получение фильтра из хранилища Redux

  // Функция для добавления нового контакта
  const handleAddContact = newContact => {
    // Проверка на наличие дубликата контакта
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

  // Рендеринг компонентов и передача необходимых данных и обработчиков событий
  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      {/* Рендеринг формы для добавления контакта и передача метода addContact как обработчика */}
      <ContactForm onSubmit={handleAddContact} />
      <h2>Contacts</h2>
      {/* Рендеринг фильтра и списка контактов */}
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={getFilteredContacts()} // Передача отфильтрованного массива контактов
        onDeleteContact={contactId => handleDeleteContact(contactId)} // Передача функции для удаления контакта с аргументом
      />
    </div>
  );
};

export default App; // Экспорт основного компонента приложения
